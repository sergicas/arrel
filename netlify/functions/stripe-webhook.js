const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase with service role key (admin access)
const supabase = createClient(
    process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
    const sig = event.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let stripeEvent;

    try {
        stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return { statusCode: 400, body: `Webhook Error: ${err.message}` };
    }

    // Handle the checkout.session.completed event
    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object;
        // userId can be in client_reference_id or metadata
        const userId = session.client_reference_id || session.metadata?.userId;

        if (!userId) {
            console.error('No userId found in session:', session.id);
            return { statusCode: 400, body: 'Missing userId' };
        }

        console.log(`Processing payment for user: ${userId}, Session: ${session.id}`);

        // Update user_state to mark as paid
        // We use upsert to be safe, though update should work if the record exists
        const { data, error } = await supabase
            .from('user_state')
            .update({
                has_paid: true,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', userId)
            .select();

        if (error) {
            console.error('Error updating user_state in Supabase:', error);
            return { statusCode: 500, body: 'Database update failed' };
        }

        if (data.length === 0) {
            console.warn(`User state not found for user ${userId}. Attempting to insert.`);
            // If update failed because record didn't exist (unlikely but possible), try insert/upsert
            const { error: insertError } = await supabase
                .from('user_state')
                .upsert({
                    user_id: userId,
                    has_paid: true,
                    current_day: 1, // Default if creating new
                    current_cycle: 1,
                    updated_at: new Date().toISOString()
                });

            if (insertError) {
                console.error('Error inserting user_state:', insertError);
                return { statusCode: 500, body: 'Database insert failed' };
            }
        }

        console.log(`SUCCESS: User ${userId} marked as paid.`);
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
