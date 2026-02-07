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

## Deploy

Pushes to the connected GitHub repo trigger an automatic deploy on Vercel. Ensure `npm run build` succeeds and that `theme/` is the deploy output (already set in `vercel.json`).
