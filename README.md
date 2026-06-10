# Maandeeq Restaurant — Website

Minimalist single-page site for Maandeeq Somali Restaurant, Woolwich.
Online ordering (basket → WhatsApp), table reservations, full menu, catering,
reviews, and contact details.

Pure static site — **no build step required**.

## Run locally

Any static server works. From this folder:

```bash
# Python
python3 -m http.server 8000
# then open http://localhost:8000

# or Node
npx serve .
```

Open `index.html` directly in a browser also works.

## Deploy to Vercel

### Option A — drag & drop (fastest)
1. Go to https://vercel.com/new
2. Drag this whole folder onto the page (or upload the zip).
3. Framework preset: **Other** · Build command: *(leave empty)* · Output dir: *(leave empty / `.`)*.
4. Deploy. Done.

### Option B — from GitHub
1. Create a new GitHub repo and push the contents of this folder:
   ```bash
   git init
   git add .
   git commit -m "Maandeeq site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In Vercel → **Add New → Project → Import** your repo.
3. Framework preset **Other**, no build command. Deploy.

## Structure

```
index.html        Entry point (loads React + Babel from CDN)
maandeeq.css      Design system + all styles
src/
  data.js         Menu, site info (phone, address), nav links, reviews, FAQs
  icons.jsx       Inline SVG icon set
  store.jsx       Cart state, helpers, scroll-reveal
  nav.jsx         Nav, mobile sheet, cart drawer
  forms.jsx       Reservation + newsletter forms
  sections.jsx    Hero, menu, platters, catering, reviews, about, visit, FAQ
  app.jsx         App shell + Tweaks panel
  tweaks-panel.jsx
assets/           Logos + food photography
```

## Editing content

Most copy lives in **`src/data.js`** — menu items/prices, the `SITE` object
(phone, WhatsApp, email, address, hours), reviews and FAQs. Edit there and refresh.
