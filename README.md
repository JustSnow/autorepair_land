# AutoRepairServiceLand

One-page static landing for an auto service: portfolio-first proof, services with "from …" prices, FAQ, and a demo booking modal (no backend, nothing is sent).

Stack: plain HTML/CSS/JS bundled by [Vite](https://vite.dev/) into static files. No runtime libraries.

## Local development

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
npm run dev       # dev server with hot reload, http://localhost:5173
```

## Static build

```bash
npm run build     # writes the static site to dist/
npm run preview   # serves dist/ locally, http://localhost:4173
```

`dist/` contains `index.html` with all content prerendered plus hashed CSS, JS and images in `dist/assets/`. Any static host can serve it.

`vite.config.js` sets `base: "./"`, so asset URLs are relative and the same build works at `https://<owner>.github.io/` and at `https://<owner>.github.io/<repo>/`.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

1. Push this project to a GitHub repository (default branch `main`).
2. In the repository open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
4. When the `deploy` job finishes, the URL is shown in the job summary and under **Settings → Pages**.

Manual alternative without Actions: run `npm run build` and publish the contents of `dist/` to a `gh-pages` branch, then select that branch under **Settings → Pages → Deploy from a branch**.

## Before production

The page currently ships as a **preview**:

- `<meta name="robots" content="noindex">` is set in `index.html`. Remove it only when the page is on its agreed production URL.
- Once that URL is known, add `<link rel="canonical">`, `og:url`, `og:image` / `twitter:image` (absolute HTTPS, hero SUV image recommended) and `url` fields in the JSON-LD.
- Phone `+7 (000) 000-00-00`, prices, team members and testimonials are placeholders.
- The booking form is a demo: on submit it closes and shows a confirmation, but no data leaves the browser.
