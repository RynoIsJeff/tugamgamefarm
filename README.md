# Tugam Cattle & Game Farm

Website for **Tugam Cattle & Game Farm**, Pongola, KwaZulu-Natal — accommodation, venue hire, Ankole cattle, and hunting experiences.

**Client:** Tugam Cattle & Game Farm  
**Built & maintained by:** [Ultimate Marketing Smash](https://ultimatemarketingsmash.com)

---

## Tech stack

- Static HTML (with [gulp-file-include](https://www.npmjs.com/package/gulp-file-include) partials)
- SCSS → CSS (Gulp, Autoprefixer, source maps)
- Bootstrap 4, jQuery, Slick, Colorbox, Shuffle, Leaflet
- **Deploy:** Vercel (GitHub → auto-deploy)

---

## Local development

1. **Prerequisites:** [Node.js](https://nodejs.org/) and [Gulp CLI](https://gulpjs.com/docs/en/getting-started/quick-start) (`npm install -g gulp-cli`).
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run dev server** (builds, watches source, live-reloads):
   ```bash
   npm run dev
   ```
   Opens the site from the `theme` folder in your browser.

4. **Production build** (output in `theme/`):
   ```bash
   npm run build
   ```

- **Source:** `source/` (HTML, partials in `source/partials/`, SCSS in `source/scss/`, JS in `source/js/`).
- **Built output:** `theme/` — this is what Vercel serves (`outputDirectory: "theme"` in `vercel.json`).

---

## Content notes

- **Social links (Facebook, Instagram)** are hidden until the client provides URLs. To show them: in `source/partials/header.htm` and `source/partials/footer.htm` remove the class `social-links-placeholder` from the top bar social div and the footer `.footer-social` div, then remove the `.social-links-placeholder { display: none !important; }` rule from the `<style>` block in `header.htm`. Update the `href` values to the client’s profiles and run `npm run build`.

---

## Deploy

Pushes to the connected GitHub repo trigger an automatic deploy on Vercel. Ensure `npm run build` succeeds and that `theme/` is the deploy output (already set in `vercel.json`).

---

## Contact form (Vercel)

The contact form submits to **`/api/contact`**. The serverless function lives in **`api/contact.js`** at the repo root (Vercel picks this up automatically).

### What to check on Vercel

1. **Environment variables** (Project → Settings → Environment Variables). Add:
   - `SMTP_HOST` — your mail server (e.g. `smtp.gmail.com`, or your host’s SMTP).
   - `SMTP_PORT` — usually `587` (or `465` for SSL).
   - `SMTP_SECURE` — `true` for port 465, `false` for 587.
   - `SMTP_USER` — SMTP login email.
   - `SMTP_PASS` — SMTP password (use an app password if required).
   - `TO_EMAIL` — where enquiries are sent (default: `bookings@tugamgamefarm.co.za`).
   - `FROM_EMAIL` — (optional) sender address; defaults to `SMTP_USER`.

2. **Build & output**
   - Build command: `npm run build` (or leave default if it runs this).
   - Output directory: `theme` (must match `vercel.json`).

3. **After deploy**
   - Open the live site, go to Contact, submit a test message.
   - If it fails: check Vercel → Deployments → [latest] → Functions for errors, and confirm all env vars are set and have no typos.
