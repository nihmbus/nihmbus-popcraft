---
name: popcraft-video
description: Get video out of PopCraft — MP4 and GIF exports of animations and compositions, in every social size, and short-form (Reels/TikTok/Shorts) pipelines. Use when the user asks for a video, reel, TikTok, MP4, GIF or a set of ad videos.
license: MIT
homepage: https://github.com/nihmbus/nihmbus-popcraft
triggers:
  - video
  - mp4
  - gif
  - reel
  - tiktok
---

# PopCraft video

Read the **popcraft** skill first. Build the animation with **popcraft-motion**.

## Through the Nihmbus plugin (Nihmbus agents)

The PopCraft plugin API can't export video yet: `ext__popcraft__export` makes stills only. So:

1. Build and check the animation in the user's file (**popcraft-motion**).
2. Export a cover still with `ext__popcraft__export`.
3. Ask the user to export the video themselves: select the frame or composition in PopCraft, then **Export → MP4** (or GIF), 30 fps, 1080p. Say which frame and settings.

## With the CLI (agents with a shell)

```sh
popcraft run file.popcraft doc.outline --depth 1          # find the frame id
popcraft run file.popcraft export.mp4 --id <frame> --fps 30 --resolution 1080p --quality high --audio true --yes --out out/clip.mp4
popcraft run file.popcraft export.gif --id <frame> --fps 24 --palette global --loop true --yes --out out/clip.gif
popcraft run file.popcraft export.nodes --ids <frame> --format PNG --time 1500 --yes --out out/cover.png
```

- `--fps` is one of 24, 25, 30, 50, 60, 120. `popcraft commands export.mp4` lists every flag.
- Exports render in headless Chrome with WebGPU. A Mac or a machine with a GPU is fast; a Linux machine without a GPU renders in software, minutes per clip.

## Short-form sets

1. Write one spec per video: hook (≤ 1 s), three beats of three-word captions, a call to action, the track, 1080×1920.
2. Generate each from one shared template with the spec as data, so the set stays consistent.
3. Export every size (9:16 for Reels/TikTok/Shorts, 4:5 and 1:1 for feeds) and a cover still for each.
