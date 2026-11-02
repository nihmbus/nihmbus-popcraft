---
name: popcraft-graphics
description: Make static graphics in PopCraft — posters, social posts and stories, thumbnails, banners, ads — and export PNG, JPG, WEBP, SVG or PDF. Use when the user asks for an image, poster, graphic, social post, banner or thumbnail.
license: MIT
homepage: https://github.com/nihmbus/nihmbus-popcraft
triggers:
  - poster
  - graphic
  - social post
  - banner
  - thumbnail
---

# PopCraft graphics

Read the **popcraft** skill first (connecting, docs, which tools run where).

## Procedure

1. **Brief.** Subject, size, copy and brand. Common sizes: Instagram post 1080×1080, portrait 1080×1350, story/Reel/TikTok 1080×1920, X post 1600×900, YouTube thumbnail 1280×720. Use the subject's own brand (colors, fonts, logo); ask if you don't have it.
2. **Build it** in the user's open file with `ext__popcraft__call`, batched with `calls`:
   - a frame at the size (`createNode` with type `FRAME`), named for what it is;
   - background, shapes and images (`createNode`, `createImage`, `setFills`);
   - text (`createNode` type `TEXT`, then `setText` and `setTypography`);
   - layout (`setAutoLayout`, `alignNodes`, `distributeNodes`).
   Check the plugin API reference for each method's arguments.
3. **Look before you export.** `getDocumentOutline` and `measureNodes` show structure and bounds; fix overflow, overlaps and anything outside the frame.
4. **Export** with `ext__popcraft__export` (`format: "PNG"`, `scale: 2` for crisp output; SVG or PDF for print).
5. **Report** the file URL and show the image. Offer variations (sizes, colorways) instead of guessing.

## Rules

- Keep text inside a 6 % safe margin; text contrast at least 4.5:1.
- One idea per graphic: one headline, at most ~12 words of supporting copy.
- Name layers meaningfully: people will edit this file after you.
- Don't invent logos, product shots or people. Use the user's assets, or ask.
