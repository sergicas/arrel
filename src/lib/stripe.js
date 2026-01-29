// import { loadStripe } from '@stripe/stripe-js';
import { analytics } from './analytics';

// Initialize Stripe with Publishable Key (Replace with env variable in prod)
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

/**
 * Initiates the checkout process.
 * Since we are a client-side only app (no backend for Session creation yet),
 * we use Stripe Payment Links which is the recommended Serverless approach.
 */
export const startCheckout = async (userEmail) => {
    // Track initiation
    analytics.trackEvent('Commerce', 'Initiate Checkout', 'Premium Plan');

    // SIMULATE API CALL / LOADING
    await new Promise(resolve => setTimeout(resolve, 800));

    // REDIRECT TO STRIPE PAYMENT LINK
    // In a real scenario, this would be your live link from Stripe Dashboard
    // e.g., https://buy.stripe.com/abc12345

    // REAL PAYMENT LINK (Provided by User)
    const PAYMENT_LINK = 'https://buy.stripe.com/4gM8wP6J3gQz3HOdPn0co00'; // ACTIVE LINK

    // We can append pre-filled email if the link supports it (e.g. ?prefilled_email=user@example.com)
    const finalLink = userEmail
        ? `${PAYMENT_LINK}?prefilled_email=${encodeURIComponent(userEmail)}`
        : PAYMENT_LINK;

    // Perform Redirection
    window.location.href = finalLink;
};
