# Alperen Baltacı — Portfolio

A responsive, static portfolio for gameplay, simulation, and application work. Built with semantic HTML, CSS, and a small JavaScript layer. No application framework or runtime dependencies.

## Develop

Requires Node.js 20 or later.

```sh
npm run build
npm test
npm start
```

Preview: http://localhost:4173. Rebuild and reload after source changes. `PORT` overrides the preview port.

## Edit content

- `src/index.html`: homepage content and structure.
- `data/projects.json`: all 12 project summaries, technical breakdowns, links, and media references.
- `scripts/build.mjs`: shared layouts, project pages, printable résumé, metadata, sitemap, and deploy output.
- `assets/css/style.css`: responsive visual system and print layout.
- `assets/js/script.js`: filters, mobile navigation, click-to-play media, and form feedback.
- `assets/media/`: optimized project media. Only this selected media directory is deployed; legacy template images remain available in Git history/source.

`dist/` is generated and ignored. Netlify runs `npm run build` and publishes `dist/`, as specified in `netlify.toml`. The asset preparation script is optional maintenance tooling, not part of deployment; it requires Python and Pillow.

The résumé is a project-based profile using existing public information. Its **Print / Save PDF** button opens the browser print dialog with a dedicated A4 layout.

## Deployment and contact form

See [DEPLOYMENT.md](DEPLOYMENT.md) for Netlify deployment, form activation, and connecting a `.com` domain. Netlify form detection must be enabled for `portfolio-contact` to accept messages. A direct email link remains available. The local preview deliberately does not send messages.

## Content and media provenance

See [CONTENT_SOURCES.md](CONTENT_SOURCES.md). Gameplay images are original project captures; the Parkour and Vampire covers are explicitly labelled system illustrations. Prototype scope is stated on the detail pages. No performance statistics, commercial releases, studio employment, or live payment integration have been invented.

## Domain configuration

The default canonical origin is `https://alperenbaltaci.netlify.app`. After connecting a custom domain, set Netlify's `SITE_URL` environment variable to its HTTPS origin and redeploy. The build updates canonical URLs, Open Graph URLs, the sitemap, and robots.txt together.
