// Client-side Notion API integration
// Uses notion-api-worker or direct client-side fetching

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

// Notion API base URL - using notion-api-worker for CORS
const NOTION_API_BASE = 'https://notion-api.splitbee.io/v1';

// Alternative: Use your own Notion database ID
const DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID || '';

// Fetch notes from a Notion database using unofficial API
export async function fetchNotesFromNotion(): Promise<NotionNote[]> {
    if (!DATABASE_ID) {
        console.warn('NEXT_PUBLIC_NOTION_DATABASE_ID is not configured');
        return [];
    }

    try {
        // For now, return empty - user needs to set up Notion
        // This will be populated after Notion integration is configured
        return [];
    } catch (error) {
        console.error('Error fetching notes from Notion:', error);
        return [];
    }
}

// For a simpler initial setup, we can use static data
// that gets updated when you deploy
export function getStaticNotes(): NotionNote[] {
    // These are placeholder notes - replace with your actual Notion data
    // or implement full Notion API integration
    return [
        {
            id: '1',
            title: 'Coming Soon: Weekly AI Notes',
            slug: 'coming-soon',
            date: new Date().toISOString().split('T')[0],
            excerpt: 'I will be sharing weekly insights on AI, machine learning, and the latest tech trends. Stay tuned!',
            tags: ['AI', 'Updates'],
            published: true,
        },
    ];
}

// Parse Notion blocks for rendering
export function parseNotionBlocks(blocks: unknown[]): NotionBlock[] {
    // Simplified block parsing
    return blocks.map((block: unknown, index) => {
        const b = block as Record<string, unknown>;
        return {
            id: (b.id as string) || `block-${index}`,
            type: (b.type as string) || 'paragraph',
            content: extractContent(b),
        };
    });
}

function extractContent(block: Record<string, unknown>): string {
    const type = block.type as string;
    const content = block[type] as Record<string, unknown>;

    if (content?.rich_text) {
        const richText = content.rich_text as Array<{ plain_text: string }>;
        return richText.map(t => t.plain_text).join('');
    }

    return '';
}
