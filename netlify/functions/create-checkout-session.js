const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://arrel.eu,https://www.arrel.eu')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const buildHeaders = (origin) => {
    const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
    return {
        'Access-Control-Allow-Origin': allowOrigin,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Vary': 'Origin',
        'Content-Type': 'application/json',
    };
};

exports.handler = async (event) => {
    const origin = event.headers?.origin || event.headers?.Origin || '';
    const headers = buildHeaders(origin);

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const payload = JSON.parse(event.body || '{}');
        const userId = typeof payload.userId === 'string' ? payload.userId.trim() : '';
        const userEmail = typeof payload.userEmail === 'string' ? payload.userEmail.trim() : '';

        if (!userId || !userEmail) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing userId or userEmail' }),
            };
        }

        if (!EMAIL_RE.test(userEmail) || userEmail.length > 254) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid email' }),
            };
        }

        if (userId.length > 128) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid userId' }),
            };
        }

        const siteUrl = process.env.URL || 'https://arrel.eu';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            client_reference_id: userId,
            customer_email: userEmail,
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
            success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${siteUrl}/payment/cancel`,
            allow_promotion_codes: true,
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ url: session.url, sessionId: session.id }),
        };
    } catch (error) {
        console.error('Stripe checkout error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Unable to create checkout session' }),
        };
    }
};
