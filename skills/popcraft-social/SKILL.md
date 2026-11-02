---
name: popcraft-social
description: Plan and produce an on-brand social media set with PopCraft — graphics and videos in every platform size, plus post copy — then publish through Nihmbus after the user approves. Use when the user asks for social content, a campaign, an ad set, launch posts or a content calendar with visuals.
license: MIT
homepage: https://github.com/nihmbus/nihmbus-popcraft
triggers:
  - social media
  - campaign
  - ad set
  - launch posts
  - content calendar
---

# PopCraft social sets

Read the **popcraft** skill first.

## Procedure

1. **Subject and brand.** Resolve the subject (`entity_search({ kind: 'subject', q })`) and load its voice and knowledge. Collect its brand: colors, fonts, logo. Ask for anything missing rather than inventing it.
2. **Plan as data.** One entry per post: platform, size, hook, three short captions, call to action, color. Show the plan before you build.
3. **Make it.** Stills: **popcraft-graphics**. Motion: **popcraft-motion**. Video: **popcraft-video**. Build each size as its own frame, all from one shared layout.
4. **Copy.** For each asset: the post text, a headline, a description and up to five hashtags, in the subject's voice.
5. **Review gate.** Show the user every asset and its copy. Only after they approve, publish with `publish_to_channels({ subjectId, topic, media })`, or `post` for one platform. Never post without approval in this turn.

## Copy rules

- No prices, discounts or dates unless the user gave them.
- No health, medical, legal or financial claims; no invented testimonials, numbers or awards.
- Hook in the first line; one call to action per post.
- Match the platform: short and punchy for TikTok and Instagram, more context for LinkedIn.
