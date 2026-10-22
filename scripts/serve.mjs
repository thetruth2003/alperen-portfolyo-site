import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.env.PORT || 4173);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.txt':'text/plain','.xml':'application/xml'};
http.createServer(async (req,res)=>{
  if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405);res.end('Local preview only');return;}
  try {
    const url = new URL(req.url,'http://localhost');
    const relative = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';
    let target = path.resolve(root,relative);
    if (!target.startsWith(root+path.sep)) {res.writeHead(403);res.end();return;}
    if ((await stat(target)).isDirectory()) target=path.join(target,'index.html');
    const data=await readFile(target);
    res.writeHead(200,{'Content-Type':mime[path.extname(target)] || 'application/octet-stream','Cache-Control':'no-store'});
    res.end(req.method==='HEAD'?undefined:data);
  } catch {
    res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
    res.end(await readFile(path.join(root,'404.html')).catch(()=>Buffer.from('Not found')));
  }
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://localhost:${port}`));
