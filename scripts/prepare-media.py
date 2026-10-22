"""One-time asset preparation. Site builds do not need Python or network access."""
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageOps
import json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'media'
CACHE = ROOT / '.media-cache'
OUT.mkdir(parents=True, exist_ok=True)
CACHE.mkdir(exist_ok=True)

downloads = {
    'modular.gif': 'https://raw.githubusercontent.com/thetruth2003/goodboys/main/Images/badpigges.gif',
    'ev-charging.png': 'https://raw.githubusercontent.com/thetruth2003/charge_station_app/f6c633594463f79898367ba91ef24bc384565650/output/mobile/0.7.0-ekranlar/02-aktif-sarj.png',
    'ev-wallet.png': 'https://raw.githubusercontent.com/thetruth2003/charge_station_app/f6c633594463f79898367ba91ef24bc384565650/output/mobile/0.7.0-ekranlar/05-cuzdan.png',
    'ev-start.png': 'https://raw.githubusercontent.com/thetruth2003/charge_station_app/f6c633594463f79898367ba91ef24bc384565650/output/mobile/0.7.0-ekranlar/01-baslatma.png',
    'factory-plan.png': 'https://raw.githubusercontent.com/thetruth2003/factory_app/749fb4f16c1624eec92d2a7815ec8a53e295a475/asset/factory_kroki.png',
    'snake.png': 'https://raw.githubusercontent.com/thetruth2003/snake_game/main/ForReadme/1.png',
}
for name, url in downloads.items():
    target = CACHE / name
    if not target.exists():
        with urlopen(Request(url, headers={'User-Agent': 'PortfolioAssetPreparation'}), timeout=45) as response:
            target.write_bytes(response.read())
    print('Downloaded', name, target.stat().st_size)

sources = {
    'combat': ROOT / 'assets/images/axe4.gif',
    'engine': ROOT / 'assets/images/engine.gif',
    'modular': CACHE / 'modular.gif',
    'dark-descent': ROOT / 'assets/images/darkdescent.png',
    'aponun-koyu': ROOT / 'assets/images/aponun koyu.PNG',
    'tower-defense': ROOT / 'assets/images/tower.png',
    'last-branch': ROOT / 'assets/images/m9WhlZ.png',
    'snake': CACHE / 'snake.png',
    'ev-charging': CACHE / 'ev-charging.png',
    'ev-wallet': CACHE / 'ev-wallet.png',
    'ev-start': CACHE / 'ev-start.png',
    'factory-plan': CACHE / 'factory-plan.png',
}
manifest = {}
for name, source in sources.items():
    with Image.open(source) as im:
        if getattr(im, 'is_animated', False):
            im.seek(min(12, im.n_frames - 1))
        poster = ImageOps.exif_transpose(im.convert('RGB'))
        poster.thumbnail((1440, 1440), Image.Resampling.LANCZOS)
        poster.save(OUT / f'{name}.webp', quality=84, method=6)
        manifest[name] = {'width': poster.width, 'height': poster.height, 'bytes': (OUT / f'{name}.webp').stat().st_size}
        print('Optimized', name, manifest[name])

# Animation is loaded only after the visitor explicitly presses Play.
for name in ['combat', 'engine', 'modular']:
    with Image.open(sources[name]) as im:
        frames, durations = [], []
        step = 2
        for i in range(0, im.n_frames, step):
            im.seek(i)
            frame = im.convert('RGB')
            frame.thumbnail((960, 640), Image.Resampling.LANCZOS)
            frames.append(frame)
            durations.append(im.info.get('duration', 50) * min(step, im.n_frames-i))
        frames[0].save(OUT / f'{name}-demo.webp', save_all=True, append_images=frames[1:], duration=durations, loop=0, quality=68, method=4)
        print('Animation', name, (OUT / f'{name}-demo.webp').stat().st_size)
(CACHE / 'manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
