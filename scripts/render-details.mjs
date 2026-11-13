export const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL = value => /^(https:\/\/|\/[^/]|#)/.test(value) ? escape(value) : '#';
function inline(value) {
  return escape(value).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
function media(item) {
  return `<figure class="case-media"><a href="${safeURL(item.src)}" target="_blank" rel="noopener noreferrer" aria-label="Open image: ${escape(item.alt)} (new tab)"><img src="${safeURL(item.src)}" alt="${escape(item.alt)}" width="${item.width || (item.src.includes("/ev-") ? 648 : 1200)}" height="${item.height || (item.src.includes("/ev-") ? 1440 : 675)}" loading="lazy" decoding="async"></a>${item.animation?`<button class="button button-ghost" data-animation="${safeURL(item.animation)}" data-poster="${safeURL(item.src)}" aria-pressed="false">▶ Play development clip</button>`:''}<figcaption>${escape(item.caption || item.alt)}</figcaption></figure>`;
}
function block(b) {
  if(b.type==='paragraph') return `<p>${inline(b.text)}</p>`;
  if(b.type==='heading') return `<h3>${inline(b.text)}</h3>`;
  if(b.type==='list') return `<ul class="case-list">${b.items.map(x=>`<li>${inline(x)}</li>`).join('')}</ul>`;
  if(b.type==='code') return `<pre tabindex="0" aria-label="Code or system structure"><code>${escape(b.text)}</code></pre>`;
  if(b.type==='table') return `<div class="case-table" tabindex="0" role="region" aria-label="${escape(b.label||'System reference table')}"><table><thead><tr>${b.rows[0].map(x=>`<th scope="col">${inline(x)}</th>`).join('')}</tr></thead><tbody>${b.rows.slice(1).map(row=>`<tr>${row.map(x=>`<td>${inline(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if(b.type==='media') return media(b);
  return '';
}
export function caseStudy(p,d) {
  const sections=d.sections || [];
  const wordCount=JSON.stringify([d.intro,sections]).split(/\s+/).length;
  return `<div class="case-facts"><div><span class="eyebrow">PROJECT FOCUS</span><strong>${escape(p.type)}</strong></div><div><span class="eyebrow">TECHNOLOGY</span><strong>${escape(p.tags.join(' / '))}</strong></div><div><span class="eyebrow">DEEP DIVE</span><strong>${sections.length} chapters · ${Math.max(2,Math.round(wordCount/220))} min read</strong></div></div>
  <div class="project-story detailed-story"><aside class="story-aside"><div class="story-sticky"><p class="eyebrow">THE WORK, IN DETAIL</p><h2>Inside the project<span class="accent">.</span></h2><details class="case-nav" open><summary>Explore the chapters</summary><nav aria-label="Project chapters"><a href="#overview">Overview & my contribution</a>${sections.map((s,i)=>`<a href="#${escape(s.id)}"><span>${String(i+1).padStart(2,'0')}</span>${escape(s.title)}</a>`).join('')}<a href="#project-sources">Explore the source</a></nav></details><a class="text-link story-contact" href="/#contact">Talk about this work ↗</a></div></aside>
  <div class="story-content"><section id="overview"><p class="eyebrow">OVERVIEW</p><h2>${escape(d.heading || 'The project and my contribution')}</h2>${(d.intro||[p.overview]).map(x=>`<p>${inline(x)}</p>`).join('')}<h3>My contribution</h3><ul class="contributions">${p.contributions.map(x=>`<li>${inline(x)}</li>`).join('')}</ul></section>
  ${sections.map((s,i)=>`<section id="${escape(s.id)}" class="case-chapter"><p class="eyebrow">CHAPTER ${String(i+1).padStart(2,'0')}</p><h2>${escape(s.title)}</h2>${(s.paragraphs||[]).map(x=>`<p>${inline(x)}</p>`).join('')}${s.bullets?`<ul class="case-list">${s.bullets.map(x=>`<li>${inline(x)}</li>`).join('')}</ul>`:''}${s.code?block({type:'code',text:s.code}):''}${(s.blocks||[]).map(block).join('')}${(s.media||[]).map(media).join('')}</section>`).join('')}
  <section id="project-sources" class="case-sources"><h2>Explore the source</h2><p>Read the implementation, project documentation, and original game pages.</p><div class="source-links">${(d.sources||[]).map(s=>`<a href="${safeURL(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.label)} ↗<span class="sr-only"> (opens in a new tab)</span></a>`).join('')}</div></section></div></div>`;
}
export function resumeExperience(r) {
  return `<section class="resume-section" id="experience"><p class="eyebrow">CAREER & COLLABORATION</p><h2>Experience</h2><div class="experience-timeline">${r.experience.map(e=>`<article class="experience-entry"><div class="experience-heading"><div><h3>${escape(e.role)}</h3><p class="experience-company">${escape(e.company)}</p></div><p class="experience-dates">${escape(e.dates)}</p></div><p class="experience-context">${escape(e.context)}</p><ul class="case-list">${e.points.map(x=>`<li>${escape(x)}</li>`).join('')}</ul></article>`).join('')}</div></section>`;
}
