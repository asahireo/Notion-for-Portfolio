import { Client, isFullPage } from '@notionhq/client';
import type {
    BlockObjectResponse,
    PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

// Initialize Notion client
const notion = new Client({
    auth: process.env.NOTION_API_KEY,
    fetch: fetch,
});

const databaseId = process.env.NOTION_DATABASE_ID || '';

export interface NotionNote {
    id: string;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    tags: string[];
    published: boolean;
}

export interface NotionBlock {
    id: string;
    type: string;
    content: string;
    children?: NotionBlock[];
    language?: string;
    url?: string;
    caption?: string;
}

// Helper to get property value safely
function getPropertyValue(properties: PageObjectResponse['properties'], name: string, type: string): unknown {
    const prop = properties[name];
    if (!prop) return null;
    return prop;
}

// Fetch all notes from the database
export async function getNotes(): Promise<NotionNote[]> {
    if (!databaseId) {
        console.warn('NOTION_DATABASE_ID is not configured');
        return [];
    }

    try {
        // First, try to query with Published filter (if property exists)
        let response;
        try {
            response = await notion.databases.query({
                database_id: databaseId,
                filter: {
                    property: 'Published',
                    checkbox: {
                        equals: true,
                    },
                },
                sorts: [
                    {
                        property: 'Date',
                        direction: 'descending',
                    },
                ],
            });
        } catch {
            // If Published property doesn't exist, query without filter
            response = await notion.databases.query({
                database_id: databaseId,
            });
        }

        return response.results
            .filter(isFullPage)
            .map((page: PageObjectResponse) => {
                const properties = page.properties;

                // Try to get title from either "Title" or "Name" property
                let title = 'Untitled';
                const titleProp = properties.Title || properties.Name;
                if (titleProp?.type === 'title' && titleProp.title.length > 0) {
                    title = titleProp.title[0].plain_text;
                }

                // Try to get slug, fall back to page id
                let slug = page.id;
                const slugProp = properties.Slug;
                if (slugProp?.type === 'rich_text' && slugProp.rich_text.length > 0) {
                    slug = slugProp.rich_text[0].plain_text;
                }

                // Try to get date, fall back to created time
                let date = page.created_time.split('T')[0];
                const dateProp = properties.Date;
                if (dateProp?.type === 'date' && dateProp.date) {
                    date = dateProp.date.start;
                }

                // Try to get excerpt
                let excerpt = '';
                const excerptProp = properties.Excerpt;
                if (excerptProp?.type === 'rich_text' && excerptProp.rich_text.length > 0) {
                    excerpt = excerptProp.rich_text[0].plain_text;
                }

                // Try to get tags
                let tags: string[] = [];
                const tagsProp = properties.Tags;
                if (tagsProp?.type === 'multi_select') {
                    tags = tagsProp.multi_select.map((tag) => tag.name);
                }

                return {
                    id: page.id,
                    title,
                    slug,
                    date,
                    excerpt,
                    tags,
                    published: true,
                };
            });
    } catch (error) {
        console.error('Error fetching notes from Notion:', error);
        throw error;
    }
}

// Get a single note by slug
export async function getNoteBySlug(
    slug: string
): Promise<{ note: NotionNote; blocks: NotionBlock[] } | null> {
    if (!databaseId) {
        console.warn('NOTION_DATABASE_ID is not configured');
        return null;
    }

    // First try to find by Slug property
    let response;
    try {
        response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: 'Slug',
                rich_text: {
                    equals: slug,
                },
            },
        });
    } catch {
        // If Slug property doesn't exist, we need to find by page id
        response = { results: [] };
    }

    let fullPages = response.results.filter(isFullPage);

    // If not found by slug, try to find by id
    if (fullPages.length === 0) {
        try {
            const page = await notion.pages.retrieve({ page_id: slug });
            if (isFullPage(page)) {
                fullPages = [page];
            }
        } catch {
            return null;
        }
    }

    if (fullPages.length === 0) {
        return null;
    }

    const page = fullPages[0] as PageObjectResponse;
    const properties = page.properties;

    // Extract note metadata
    let title = 'Untitled';
    const titleProp = properties.Title || properties.Name;
    if (titleProp?.type === 'title' && titleProp.title.length > 0) {
        title = titleProp.title[0].plain_text;
    }

    let date = page.created_time.split('T')[0];
    const dateProp = properties.Date;
    if (dateProp?.type === 'date' && dateProp.date) {
        date = dateProp.date.start;
    }

    let excerpt = '';
    const excerptProp = properties.Excerpt;
    if (excerptProp?.type === 'rich_text' && excerptProp.rich_text.length > 0) {
        excerpt = excerptProp.rich_text[0].plain_text;
    }

    let tags: string[] = [];
    const tagsProp = properties.Tags;
    if (tagsProp?.type === 'multi_select') {
        tags = tagsProp.multi_select.map((tag) => tag.name);
    }

    const note: NotionNote = {
        id: page.id,
        title,
        slug,
        date,
        excerpt,
        tags,
        published: true,
    };

    // Fetch page blocks (content)
    const blocks = await getBlocks(page.id);

    return { note, blocks };
}

// Fetch blocks for a page
async function getBlocks(blockId: string): Promise<NotionBlock[]> {
    const response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 100,
    });

    const blocks: NotionBlock[] = [];

    for (const block of response.results) {
        if (!('type' in block)) continue;
        const b = block as BlockObjectResponse;
        const parsedBlock = await parseBlock(b);
        if (parsedBlock) {
            blocks.push(parsedBlock);
        }
    }

    return blocks;
}

// Parse a single block into our simplified format
async function parseBlock(
    block: BlockObjectResponse
): Promise<NotionBlock | null> {
    const type = block.type;
    let content = '';
    let language: string | undefined;
    let url: string | undefined;
    let caption: string | undefined;
    let children: NotionBlock[] | undefined;

    switch (type) {
        case 'paragraph':
            content = richTextToPlainText(block.paragraph.rich_text);
            break;
        case 'heading_1':
            content = richTextToPlainText(block.heading_1.rich_text);
            break;
        case 'heading_2':
            content = richTextToPlainText(block.heading_2.rich_text);
            break;
        case 'heading_3':
            content = richTextToPlainText(block.heading_3.rich_text);
            break;
        case 'bulleted_list_item':
            content = richTextToPlainText(block.bulleted_list_item.rich_text);
            break;
        case 'numbered_list_item':
            content = richTextToPlainText(block.numbered_list_item.rich_text);
            break;
        case 'code':
            content = richTextToPlainText(block.code.rich_text);
            language = block.code.language;
            break;
        case 'quote':
            content = richTextToPlainText(block.quote.rich_text);
            break;
        case 'callout':
            content = richTextToPlainText(block.callout.rich_text);
            break;
        case 'image':
            if (block.image.type === 'external') {
                url = block.image.external.url;
            } else if (block.image.type === 'file') {
                url = block.image.file.url;
            }
            caption =
                block.image.caption.length > 0
                    ? richTextToPlainText(block.image.caption)
                    : undefined;
            break;
        case 'divider':
            content = '---';
            break;
        default:
            return null;
    }

    // Fetch children if the block has them
    if (block.has_children) {
        children = await getBlocks(block.id);
    }

    return {
        id: block.id,
        type,
        content,
        language,
        url,
        caption,
        children,
    };
}

// Convert Notion rich text to plain text
function richTextToPlainText(
    richText: Array<{ plain_text: string }>
): string {
    return richText.map((t) => t.plain_text).join('');
}

// Get all slugs for static generation
export async function getAllNoteSlugs(): Promise<string[]> {
    const notes = await getNotes();
    return notes.map((note) => note.slug);
}
