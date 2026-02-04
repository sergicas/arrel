
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load env vars
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') }); // Adjusted path to root

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env');
    console.log('URL:', supabaseUrl);
    // Don't print key
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifySchema() {
    console.log('Verifying user_state schema...');

    // Try to insert a dummy record to verify columns exist (then delete it or fail)
    // Actually select is safer. If column doesn't exist, Supabase API usually ignores it or errors out depending on strictness.
    // Let's try to upsert a dummy record to force column check

    /*
    const dummyId = '00000000-0000-0000-0000-000000000000';
    const { error: upsertError } = await supabase
        .from('user_state')
        .upsert({ 
            user_id: dummyId, 
            has_paid: false,
            current_day: 1, 
            current_cycle: 1
        });
        
    if (upsertError) {
         console.error('Upsert failed. Likely missing columns or RLS:', upsertError);
    } else {
         console.log('✅ Columns confirmed: has_paid');
         await supabase.from('user_state').delete().eq('user_id', dummyId);
    }
    */

    // Simple Select
    const { data, error } = await supabase
        .from('user_state')
        .select('user_id, has_paid, created_at')
        .limit(1);

    if (error) {
        console.error('Error querying user_state:', error);
    } else {
        console.log('✅ table user_state exists.');
        console.log('✅ Columns accessible: has_paid');
    }
}

verifySchema();
