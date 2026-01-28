const { Client } = require('@notionhq/client');

// Credentials are now passed via environment variables or secrets
const NOTION_API_KEY = process.env.NOTION_API_KEY || 'YOUR_KEY_HERE';
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || 'YOUR_DB_ID_HERE';

const notion = new Client({
    auth: NOTION_API_KEY,
});

async function testConnection() {
    console.log('Testing Notion Connection...');
    console.log(`Database ID: ${NOTION_DATABASE_ID}`);

    try {
        // 1. Try to retireve the database itself to check permissions
        console.log('\n1. Retrieving Database metadata...');
        const database = await notion.databases.retrieve({ database_id: NOTION_DATABASE_ID });
        console.log('✅ Database found!');
        console.log('Title:', database.title[0]?.plain_text || 'Untitled');
        console.log('Properties:', Object.keys(database.properties).join(', '));

        // 2. Try to query items
        console.log('\n2. Querying database items...');
        const response = await notion.databases.query({
            database_id: NOTION_DATABASE_ID,
            page_size: 5,
        });

        console.log(`✅ Query successful! Found ${response.results.length} items.`);

        if (response.results.length > 0) {
            const firstPage = response.results[0];
            console.log('\nFirst Item Properties:');
            const props = firstPage.properties;

            // Check for expected properties
            const expectedProps = ['Title', 'Name', 'Slug', 'Date', 'Excerpt', 'Tags', 'Published'];
            expectedProps.forEach(prop => {
                if (props[prop]) {
                    console.log(`  [OK] ${prop}: ${props[prop].type}`);
                } else {
                    console.log(`  [MISSING] ${prop}`);
                }
            });
            // 3. Try to fetch blocks for the first page
            console.log(`\n3. Fetching blocks for page ID: ${firstPage.id}...`);
            const blocks = await notion.blocks.children.list({
                block_id: firstPage.id,
                page_size: 5,
            });
            console.log(`✅ Blocks fetch successful! Found ${blocks.results.length} blocks.`);
            if (blocks.results.length > 0) {
                console.log('Sample block type:', blocks.results[0].type);
            }
        } else {
            console.log('⚠️ No items found in database (might be empty).');
        }

    } catch (error) {
        console.error('\n❌ Error Failed:');
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        if (error.body) {
            console.log('Body:', error.body);
        }
    }
}

if (require.main === module) {
    if (NOTION_API_KEY === 'YOUR_KEY_HERE') {
        console.log('Please set NOTION_API_KEY environment variable');
    } else {
        testConnection();
    }
}
