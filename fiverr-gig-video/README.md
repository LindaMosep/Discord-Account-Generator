# Fiverr Gig Video — Mobile App Developer

A 14.9-second, 1920×1080 @ 30fps gig video built with [Remotion](https://remotion.dev), plus a matching gig cover image.

## Deliverables (`out/`)

| File | Use |
| --- | --- |
| `gig-video.mp4` | Upload as the gig video (H.264, 446 frames, ~16 MB) |
| `gig-cover.png` | Upload as the gig image (1280×769, Fiverr's recommended size) |
| `gig-cover-1920x1080.png` | Full-HD version of the cover; matches the video's final frames |

The final ~1.3 s of the video (frames 408–445) holds the cover completely still, so Fiverr's
thumbnail picker lands on a clean cover frame.

## Look

Dark theme: warm near-black (`#0C0C0B`), off-white type, one chartreuse accent (`#D4FF3F`) and a
little hot orange, with film grain. Type is Bricolage Grotesque for headlines, Instrument Serif
italic for accent words, and JetBrains Mono for labels.

## Storyboard

Scenes change with a chartreuse bar wipe. A corner HUD counts scenes and a progress line runs along the bottom.

1. **Hook**: "I build mobile apps that *scale. → convert. → ship.*" Includes a decoding label, masked line reveals, a rolling word and a spinning asterisk.
2. **Experience**: a giant odometer rolls to **8+**, a marker highlight sweeps across "iOS & Android", and a tech-stack marquee scrolls past.
3. **Portfolio**: three concept apps flip in with a 3D turn: fintech wallet, fitness tracker and food delivery. A numbered list highlights each app in turn.
4. **Services**: "From idea to *App Store.*", a numbered service list and a Swift code card that types itself out.
5. **Cover**: the gig cover builds in, then holds.

## Editing

All copy and colors are in `src/config.ts` (years, headlines, rotating words, services, tech stack, palette).

```bash
npm install
npm run studio   # live preview & tweak
npm run build    # render video + cover into out/
```

If Remotion can't download its headless Chrome, pass an existing one:
`npx remotion render GigVideo out/gig-video.mp4 --browser-executable=/path/to/chrome`.
