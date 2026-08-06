# NEXORA — Computer Accessories Storefront

A colorful, dark-themed storefront demo for keyboards, mice, audio, webcams
and cables. Plain **HTML / CSS / JavaScript** — no build step, no framework.
The "RGB" button in the nav cycles the whole site's accent color, which is
the one intentional signature touch (fits the subject: RGB peripherals).

## Files
- `index.html` — page structure and content
- `style.css` — all styling, colors, layout, responsive rules
- `script.js` — product data, cart logic, filtering, RGB toggle
- `README.md` — this file

## Run it locally
No build tools needed. Just open `index.html` in a browser, or serve it:

```bash
cd nexora-site
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Put it on Git + GitHub

```bash
git init
git add .
git commit -m "Initial commit: NEXORA storefront"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Publish with GitHub Pages
1. On GitHub, open the repo → **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Pick **Branch: main**, folder **/ (root)**, then **Save**.
4. Wait ~1 minute, then your site is live at:
   `https://<your-username>.github.io/<repo-name>/`

Any time you `git push` new changes to `main`, the live site updates
automatically within a minute or two.

## About React (you listed it as optional)
I didn't build a React version, and I'd tell you not to bother with one here —
here's the honest reasoning, not just the recommendation:
- This site has no complex shared state, routing, or component reuse that
  would justify React's overhead.
- GitHub Pages serves static files. A React app would need a build step
  (Vite/CRA) and a `dist/` folder pushed to Pages — more moving parts for
  zero visible benefit at this scale.
- If you outgrow this (many product variants, real user accounts, server
  data), that's when React (or Next.js) earns its place. Right now it would
  just be extra complexity to maintain for no real gain.

## The honest limitations — read this before you try to sell anything real
You asked for direct feedback, so here it is, plainly:

1. **Nothing here processes real payments.** The "Checkout" button shows an
   alert. To actually sell, you need a payment processor (Stripe, PayPal,
   Razorpay for India, etc.) and, in almost all cases, a real backend or a
   hosted checkout — GitHub Pages cannot run server code or handle money.
2. **There's no inventory, no order storage, no database.** The product list
   lives in `script.js` as a JavaScript array. Refresh the page and the cart
   resets. Anyone can open dev tools and see (or edit) every "price."
3. **It's not secure for commerce.** Static HTML/CSS/JS has no way to
   validate a real order, prevent price tampering, or protect customer data.
   Don't put real card handling or personal data collection into this code
   as-is.
4. **Legal/business basics aren't solved by any website.** Selling physical
   goods in India (or anywhere) typically involves business registration,
   GST/tax handling, and clear refund/shipping policies — a site doesn't
   replace that paperwork.
5. **The copy, prices, and products are placeholders.** Replace them with
   real suppliers, real prices, and real photos before this looks trustworthy
   to a stranger.

If you actually want to sell, the realistic next step is one of:
- Use a hosted store platform (Shopify, Razorpay Storefront, Instamojo) that
  handles payments/tax/inventory for you, or
- Keep this front-end and add a real backend (Node/Express, Firebase, or
  Supabase) plus Stripe/Razorpay for payments.

This project is a solid, good-looking **front-end shell** — treat it as the
storefront skin, not a finished business.
