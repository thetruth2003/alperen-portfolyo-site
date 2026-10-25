# Project cover artwork

The 12 homepage project covers were generated with the built-in `image_gen` tool for this portfolio. They are illustrative key art, not screenshots or evidence of shipped gameplay, production software, or original in-game assets. A short note beside the gallery makes that distinction visible. Detail pages retain original gameplay, app screens, and explicitly labelled technical illustrations.

## Files and prompts

All optimized final files are in `assets/media/covers/`, with one WebP per project slug. The exact prompt set and filename mapping are in [docs/cover-art-prompts.json](docs/cover-art-prompts.json).

The artwork uses a consistent cinematic material treatment, deep mineral greens and charcoal, with subject-specific amber, lime, or crimson accents. Original project motifs informed the team-game illustrations. No typography, fake application UI, or editor chrome is baked into the covers.

The files are encoded as 16:10 WebP images at 800 x 500 or 960 x 600. All 12 covers total 587,368 bytes. They are lazy-loaded, and the combined homepage image budget is verified at 650,000 bytes. The original generated PNGs are retained locally in the ignored `.media-cache/cover-originals/` directory.

Cards keep accessible project names; the adjacent decorative artwork has empty alt text. Project social previews identify the cover as illustrated artwork. The original hero gameplay player and project detail media are unchanged.
