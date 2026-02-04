
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Manual Env Loader
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env');

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^["'](.*)["']$/, '$1'); // Remove quotes
            process.env[key] = value;
        }
    });
} catch (err) {
    console.error('Error reading .env file:', err.message);
}


const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env');
    console.log('URL available:', !!supabaseUrl);
    console.log('Key available:', !!supabaseServiceKey);
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifySchema() {
    console.log('Verifying user_state schema...');

    const { data, error } = await supabase
        .from('user_state')
        .select('user_id, has_paid, created_at')
        .limit(1);

    if (error) {
        console.error('Error querying user_state:', error);
    } else {
        console.log('✅ table user_state exists.');
        console.log('✅ Columns accessible: has_paid, created_at');
        if (data.length > 0) {
            console.log('Sample row found:', data[0]);
        } else {
            console.log('Table is empty but accessible.');
        }
    }
}

verifySchema();
