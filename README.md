# Tyde AI website

A lightweight, responsive recreation of the Tyde website, built for GitHub Pages with plain HTML, CSS and JavaScript. No build tools, packages, or server-side runtime are required.

## Pages

- `/` — homepage
- `/about/` — company introduction, audiences, leadership and careers
- `/services/` — the five service tracks
- `/newsletter/` — What Actually Worked newsletter
- `/resources/` — newsletter introduction and recorded Claude workshop

Each page is a directory with an `index.html`, so links work directly on GitHub Pages. Navigation and asset paths are relative, including when the site is hosted under a repository subpath.

## Preview locally

From the repository root, run:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Publish with GitHub Pages

1. Push the files to the `main` branch of `tydeai/tydeai.github.io`.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select `main` and `/ (root)`.

The site will be available at `https://tydeai.github.io/`. The `.nojekyll` file keeps deployment build-free.

## Content and integrations

- Page content, portraits, service imagery and audience graphics are based on [Tyde’s original website](https://www.tyde-ai.com/). Fonts and images are stored locally in `assets/`.
- Newsletter signup opens the original Tyde newsletter page in a new tab. Its Framer form depends on Framer’s runtime and cannot be copied as a working static HTML form. To host signup here, connect a newsletter provider first. Replace this outbound link before moving `www.tyde-ai.com` itself to this repository, or it would link back to the same page.
- The resource workshop uses a local poster and loads YouTube’s privacy-enhanced embed only when Play is selected. A direct YouTube link remains available if embedding is blocked or JavaScript is disabled.
- Service enquiries open an email to `info@tydeai.com`; job application links open Tyde’s LinkedIn page, as on the reference site. There is no local form backend.
- Careers and workshop information reflect the reference pages at implementation time; update them as listings and events change.

## Editing

Shared homepage/navigation/footer styles live in `styles.css`; inner-page layouts are in `pages.css`. `script.js` handles navigation and progressive enhancements. Headers and footers are plain HTML repeated across the five pages: update all copies when changing navigation or contact details. Social preview images use the absolute `https://tydeai.github.io/` address; update those metadata URLs if the hosting domain changes.
