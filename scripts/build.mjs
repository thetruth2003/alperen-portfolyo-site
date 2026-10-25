import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
if (path.dirname(out) !== root || path.basename(out) !== 'dist') throw new Error('Unsafe output path');
const projects = JSON.parse(await readFile(path.join(root, 'data/projects.json'), 'utf8'));
const origin = (process.env.SITE_URL || 'https://alperenbaltaci.netlify.app').replace(/\/$/, '');
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow = '<span aria-hidden="true">↗</span>';
const external = (url, label, cls='text-link') => `<a class="${cls}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)} ${arrow}<span class="sr-only"> (opens in a new tab)</span></a>`;
const tags = values => `<ul class="tags" aria-label="Technologies">${values.map(t=>`<li>${escape(t)}</li>`).join('')}</ul>`;

function head(title, description, url='/', image='/assets/media/combat.webp', imageAlt='Gameplay capture from the Advanced Combat System prototype') {
  return `<!doctype html><html lang="en"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#121414"><title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}"><link rel="canonical" href="${origin}${url}">
  <meta property="og:type" content="website"><meta property="og:site_name" content="Alperen Baltacı">
  <meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${origin}${url}"><meta property="og:image" content="${origin}${image}"><meta property="og:image:alt" content="${escape(imageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/style.css"><script src="/assets/js/script.js" defer></script>
  </head><body><a href="#main" class="skip-link">Skip to content</a>`;
}
function header(home=false) {
  const prefix = home ? '' : '/';
  return `<header class="site-header"><div class="container header-inner">
  <a class="brand" href="/" aria-label="Alperen Baltacı — home"><span class="monogram">ab<span>.</span></span><span class="brand-name">ALPEREN<br>BALTACI</span></a>
  <button class="menu-toggle" aria-expanded="false" aria-controls="primary-nav">Menu <span aria-hidden="true">☰</span></button>
  <nav id="primary-nav" class="primary-nav" aria-label="Main navigation"><a href="${prefix}#work">Work</a><a href="${prefix}#expertise">Expertise</a><a href="${prefix}#about">About</a><a href="${prefix}#contact">Contact</a></nav>
  <a class="resume-link" href="/resume.html">Résumé ${arrow}</a></div></header>`;
}
function footer() {
 return `<footer class="site-footer"><div class="container footer-inner"><a class="footer-name" href="/">Alperen Baltacı<span>Gameplay & systems programmer</span></a><div class="footer-links">${external('https://github.com/thetruth2003','GitHub')}${external('https://www.linkedin.com/in/alperen-baltacı-9656aa174/','LinkedIn')}<a href="mailto:alperenbaltaci94@gmail.com">Email ${arrow}</a></div><span class="copyright">© ${new Date().getUTCFullYear()} · Built with intention.</span></div></footer></body></html>`;
}
function media(p, detail=false) {
  if (p.gallery) return `<div class="project-media app-media${detail?' detail-app-media':''}"${detail?' tabindex="0" role="region" aria-label="Android screenshots — scroll to explore"':''}>${p.gallery.map((file,i)=>{
    const label = `TENLIVION EV ${['start session','active charging','demo wallet'][i]} — actual Android demo screen`;
    const image = `<img src="/assets/media/${file}" alt="${label}" width="648" height="1440" loading="lazy" decoding="async">`;
    return detail ? `<a class="screen-link" href="/assets/media/${file}" target="_blank" rel="noopener noreferrer" aria-label="Open ${label} at full size (new tab)">${image}</a>` : image;
  }).join('')}${detail?'':'<span class="media-note">ANDROID DEMO</span>'}</div>`;
  return `<div class="project-media ${p.slug==='factory-check'?'plan-media':''} ${p.slug==='dark-descent'?'art-media':''}"><img src="/assets/media/${p.image}" alt="${escape(p.imageAlt)}" width="${p.illustration?1200:1440}" height="${p.illustration?675:810}" loading="lazy" decoding="async">${p.illustration?'<span class="media-note">SYSTEM ILLUSTRATION</span>':p.assetCaption?`<span class="media-note">${escape(p.assetCaption)}</span>`:''}</div>`;
}
function card(p, i) {
 return `<article class="project-card${p.featured?' featured':''}" data-project data-category="${p.category}">
 <a class="project-card-link" href="/projects/${p.slug}.html" aria-label="Explore ${escape(p.title)}"><div class="project-media project-cover" aria-hidden="true"><img src="/assets/media/${escape(p.cover)}" alt="" width="1280" height="800" loading="lazy" decoding="async"></div>
 <div class="card-content"><div class="card-topline"><span>${escape(p.type)}</span><span class="project-number">${String(i+1).padStart(2,'0')}</span></div><div class="card-title-row"><h3>${escape(p.title)}</h3><span class="card-arrow" aria-hidden="true">↗</span></div><p>${escape(p.summary)}</p>${tags(p.tags)}</div></a></article>`;
}
const homeBody = await readFile(path.join(root,'src/index.html'),'utf8');
const home = head('Alperen Baltacı — Gameplay & Systems Programmer', 'Gameplay, physics, and interactive systems by Alperen Baltacı. Explore Unreal Engine, Unity, and Flutter projects with demos and technical breakdowns.') + header(true) + homeBody
 .replace('{{PROJECT_COUNT}}',projects.length)
 .replace('{{PROJECT_CARDS}}', projects.map(card).join('')) + footer();

function projectPage(p,index) {
 const next = projects[(index+1)%projects.length];
 const links = `${p.repo?external(p.repo,'View source','button button-primary'):''}${p.demo?external(p.demo,'Visit game page','button button-primary'):''}${p.related?external(p.related.url,p.related.label,'button button-ghost'):''}`;
 return head(`${p.title} — Alperen Baltacı`,p.summary,`/projects/${p.slug}.html`, `/assets/media/${p.cover}`,p.coverAlt)+header()+`
 <main id="main" class="project-page container"><a class="back-link" href="/#work">← All projects</a>
 <div class="project-intro"><p class="eyebrow">${escape(p.type)}</p><h1>${escape(p.title)}</h1><p class="project-subtitle">${escape(p.subtitle)}</p><div class="project-intro-bottom">${tags(p.tags)}<div class="project-links">${links}</div></div></div>
 <figure class="detail-media">${media(p,true)}${p.animation?`<button class="play-button" data-animation="/assets/media/${p.animation}" data-poster="/assets/media/${p.image}" aria-pressed="false"><span aria-hidden="true">▶</span> Play gameplay clip</button>`:''}<figcaption>${p.illustration?'System illustration based on the project’s implemented mechanics.':p.assetCaption?escape(p.assetCaption):p.gallery?'Actual Android demo. Scroll to explore; open any screen to see it at full size.':p.animation?'Original gameplay capture. Press Play to load the animated clip.':'Original project imagery.'}</figcaption></figure>
 <div class="project-story"><aside class="story-aside"><p class="eyebrow">PROJECT BREAKDOWN</p><h2>Inside the<br> project<span class="accent">.</span></h2><a class="text-link" href="/#contact">Talk about this work ${arrow}</a></aside><div class="story-content">
 <section><h2>Overview</h2><p>${escape(p.overview)}</p></section>
 <section><h2>What I worked on</h2><ul class="contributions">${p.contributions.map(x=>`<li>${escape(x)}</li>`).join('')}</ul></section>
 <section class="challenge-grid"><div><h2>The challenge</h2><p>${escape(p.challenge)}</p></div><div><h2>The approach</h2><p>${escape(p.approach)}</p></div></section>
 <section class="scope-note"><h2>Project context</h2><p>${escape(p.scope)}</p></section></div></div>
 <a class="next-project" href="/projects/${next.slug}.html"><span class="eyebrow">NEXT PROJECT</span><span>${escape(next.title)}</span><span aria-hidden="true">↗</span></a></main>`+footer();
}
const resume = head('Résumé — Alperen Baltacı', 'A concise overview of Alperen Baltacı’s gameplay, simulation, and application work.', '/resume.html')+header()+`
 <main id="main" class="container resume-page"><div class="resume-heading"><div><p class="eyebrow">RÉSUMÉ / PROJECT PROFILE</p><h1>Alperen Baltacı<span class="accent">.</span></h1><p>Gameplay & Systems Programmer</p></div><button class="button button-primary" data-print>Print / Save PDF ↓</button></div>
 <div class="resume-contact"><span>Warsaw, Poland</span><a href="mailto:alperenbaltaci94@gmail.com">alperenbaltaci94@gmail.com</a><a href="https://github.com/thetruth2003">github.com/thetruth2003</a></div>
 <section class="resume-section"><h2>Profile</h2><p>Programmer with a focus on gameplay mechanics, physics-driven systems, and interactive prototypes. Work spans Unreal Engine and C++, Unity and C#, and Flutter applications. I enjoy breaking complex interactions into clear systems, then bringing them together into something playable and understandable.</p></section>
 <section class="resume-section"><h2>Technical focus</h2><p>Unreal Engine · C++ · Unity · C# · Unity Netcode for GameObjects · Flutter · Dart · Firebase · Git</p></section>
 <section class="resume-section"><h2>Selected project experience</h2><div class="resume-projects">${projects.filter(p=>['combat-system','engine-powertrain','modular-vehicle-builder','multiplayer-parkour','tenlivion-ev','factory-check'].includes(p.slug)).map(p=>`<article><h3><a href="/projects/${p.slug}.html">${escape(p.title)}</a></h3><p class="resume-meta">${escape(p.tags.join(' / '))} · ${escape(p.type)}</p><p>${escape(p.summary)}</p></article>`).join('')}</div></section>
 <section class="resume-section"><h2>Team projects</h2><p>Dark Descent — gameplay and skill systems. The Last Branch — movement, flying, and parkour. Tower Defence — tower behaviors and enemy waves.</p></section>
 <section class="resume-section"><h2>Education</h2><div class="education-row"><strong>Futuregames</strong><span>Game development studies</span></div><div class="education-row"><strong>Yalova University</strong><span>2021–2023</span></div><div class="education-row"><strong>Atatürk Science High School</strong><span>2017–2021</span></div></section>
 <p class="print-url">Portfolio: ${origin}</p></main>`+footer();

await rm(out, {recursive:true, force:true});
await mkdir(path.join(out,'projects'), {recursive:true});
for (const dir of ['css','js','media','icons']) await cp(path.join(root,'assets',dir),path.join(out,'assets',dir),{recursive:true});
await writeFile(path.join(out,'index.html'),home);
await writeFile(path.join(out,'resume.html'),resume);
for (let i=0;i<projects.length;i++) await writeFile(path.join(out,'projects',`${projects[i].slug}.html`),projectPage(projects[i],i));
const thankyou = head('Thank you — Alperen Baltacı','Your portfolio contact message has been submitted.','/thank-you.html')+header()+`<main id="main" class="container message-page"><p class="eyebrow">MESSAGE SUBMITTED</p><h1>Thanks for<br>reaching out<span class="accent">.</span></h1><p>Your message has been submitted. I look forward to learning more about your project.</p><a class="button button-primary" href="/">Back to portfolio ↗</a><a class="text-link" href="mailto:alperenbaltaci94@gmail.com">Prefer email? alperenbaltaci94@gmail.com</a></main>`+footer();
await writeFile(path.join(out,'thank-you.html'),thankyou);
await writeFile(path.join(out,'404.html'),head('Page not found — Alperen Baltacı','Find your way back to Alperen Baltacı’s portfolio.','/404.html')+header()+`<main id="main" class="container message-page"><p class="eyebrow">404 / OUT OF BOUNDS</p><h1>Let’s get you<br>back in play<span class="accent">.</span></h1><p>This page doesn’t exist. The projects are right this way.</p><a class="button button-primary" href="/#work">Explore the work ↗</a></main>`+footer());
await writeFile(path.join(out,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/','/resume.html',...projects.map(p=>`/projects/${p.slug}.html`)].map(u=>`<url><loc>${escape(origin+u)}</loc></url>`).join('')}</urlset>`);
await writeFile(path.join(out,'_headers'),`/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n/assets/*\n  Cache-Control: public, max-age=3600\n/thank-you.html\n  X-Robots-Tag: noindex\n/404.html\n  X-Robots-Tag: noindex\n`);
console.log(`Built ${projects.length} project pages and portfolio → ${out}`);
