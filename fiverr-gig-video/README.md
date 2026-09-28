# Fiverr Gig Video — Mobile App Developer

A 14.5-second, 1920×1080 @ 30fps gig video built with [Remotion](https://remotion.dev), plus a matching gig cover image.

## Deliverables (`out/`)

| File | Use |
| --- | --- |
| `gig-video.mp4` | Upload as the gig video (H.264, 436 frames) |
| `gig-cover.png` | Upload as the gig image (1280×769, Fiverr's recommended size) |
| `gig-cover-1920x1080.png` | Full-HD version of the cover; byte-identical to the video's final frames |

The final ~1.3 s of the video (frames 398–435) holds the cover completely still, so Fiverr's
thumbnail picker lands on a clean cover frame.

## Storyboard

1. **Hook** (0–2.8s) — "Turn your idea into a stunning mobile app", word-by-word reveal
2. **Experience** (2.3–5.5s) — animated ring counting up to **8+ years**, three core strengths
3. **Portfolio** (5–9.8s) — three concept apps in phone mockups: fintech wallet, fitness tracker, food delivery
4. **Services** (9.2–12.4s) — service checklist, tech stack, delivery progress
5. **Cover** (11.9–14.5s) — the gig cover animates in, then holds

## Editing

All copy and colors are in `src/config.ts` (years, headline, services, tech stack, CTA).

```bash
npm install
npm run studio   # live preview & tweak
npm run build    # render video + cover into out/
```

If Remotion can't download its headless Chrome, pass an existing one:
`npx remotion render GigVideo out/gig-video.mp4 --browser-executable=/path/to/chrome`.
