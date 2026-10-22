import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, readdir, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const projects=JSON.parse(await readFile(path.join(root,'data/projects.json'),'utf8'));
const home=await readFile(path.join(dist,'index.html'),'utf8');
const pages=['index.html','resume.html','thank-you.html','404.html',...(await readdir(path.join(dist,'projects'))).map(p=>'projects/'+p)];

test('Every local link, image, script and stylesheet resolves in the deploy output',async()=>{
  for(const page of pages){
    const html=await readFile(path.join(dist,page),'utf8');
    for(const match of html.matchAll(/(?:href|src|data-animation|data-poster)="([^"]+)"/g)){
      const url=match[1];
      if(!url.startsWith('/')&&!url.startsWith('#'))continue;
      const [pathname,fragment]=url.split('#');
      const target=pathname?(pathname==='/'?'index.html':pathname.slice(1)):page;
      assert.ok((await stat(path.join(dist,target))).isFile(),`${page}: ${url}`);
      if(fragment){
        const targetHtml=await readFile(path.join(dist,target),'utf8');
        assert.ok(targetHtml.includes(`id="${fragment}"`),`${page}: missing anchor ${url}`);
      }
    }
  }
});
test('Each project has a distinct, rendered and discoverable detail page',async()=>{
  assert.equal(new Set(projects.map(p=>p.slug)).size,projects.length);
  for(const p of projects){
    assert.match(p.slug,/^[a-z0-9-]+$/);
    assert.ok(home.includes(`/projects/${p.slug}.html`));
    const html=await readFile(path.join(dist,'projects',p.slug+'.html'),'utf8');
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    assert.ok(html.includes('rel="canonical"'));
    assert.ok(!html.includes('{{'));
  }
});
test('Contact points and Netlify form contract are valid',()=>{
  assert.ok(home.includes('href="mailto:alperenbaltaci94@gmail.com"'));
  assert.ok(!home.includes('richard@example.com'));
  assert.ok(home.includes('name="portfolio-contact" method="POST"'));
  assert.ok(home.includes('name="form-name" value="portfolio-contact"'));
  assert.ok(home.includes('data-netlify="true"'));
  assert.ok(home.includes('action="/thank-you.html"'));
  for(const id of ['contact-name','contact-email','contact-message']){
    assert.ok(home.includes(`for="${id}"`));
    assert.ok(home.includes(`id="${id}"`));
  }
});
test('Filters cover all project categories and use normalized keys',()=>{
  const available=[...home.matchAll(/data-filter="([^"]+)"/g)].map(x=>x[1]);
  for(const p of projects){assert.equal(p.category,p.category.toLowerCase());assert.ok(available.includes(p.category));}
});
test('Legacy wrong/private links and unverifiable studio claims are absent',()=>{
  for(const bad of ['github.com/thetruth2003/combatsystem','Studios We','Game Programmer 90%','Richard hanrick'])assert.ok(!home.includes(bad));
  assert.equal(projects.find(p=>p.slug==='snake').repo,'https://github.com/thetruth2003/snake_game');
});
test('Initial project images remain small and contain text alternatives',async()=>{
  for(const p of projects){
    assert.ok(p.imageAlt.length>10);
    const image=await stat(path.join(dist,'assets/media',p.image));
    assert.ok(image.size<250000,`${p.image} exceeds the poster budget`);
  }
  assert.ok(!home.includes('src="/assets/media/combat-demo.webp"'));
});
