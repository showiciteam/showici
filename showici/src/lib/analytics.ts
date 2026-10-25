/** Google Analytics (GA4) settings, shared by the root layout (the tag) and the cookie banner. */
export const GA_ID = "G-BSM43KZ1HZ";
/** Where the visitor's cookie choice is saved in the browser: "granted" | "denied". */
export const CONSENT_KEY = "showici-analytics-consent";

/** Runs first in <head>: consent defaults (denied unless this browser already accepted), then the GA config. */
export const GA_HEAD_SCRIPT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var c = null; try { c = localStorage.getItem('${CONSENT_KEY}'); } catch (e) {}
gtag('consent', 'default', { analytics_storage: c === 'granted' ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
gtag('js', new Date());
gtag('config', '${GA_ID}');`;
