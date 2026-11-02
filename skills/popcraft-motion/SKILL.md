---
name: popcraft-motion
description: Make motion graphics in PopCraft — animated posts, kinetic type, logo reveals, product promos, looping social clips — with keyframes, motion presets, behaviours and beat-timed cuts. Use when the user asks for an animation, motion graphic, animated post, intro, logo reveal or kinetic typography.
license: MIT
homepage: https://github.com/nihmbus/nihmbus-popcraft
triggers:
  - motion graphic
  - animation
  - animated
  - logo reveal
  - kinetic type
---

# PopCraft motion

Read the **popcraft** skill first. Read "Animating with the agent" in the PopCraft docs (`https://popcraft.app/llms.txt` lists it): the motion methods take the same arguments as PopCraft's own agent tools.

## Procedure

1. **Design the still first** (see **popcraft-graphics**): the frame at rest is the end state of every entrance.
2. **Set the timeline**: `setTimeline` on the frame (length, fps 30, markers for beats).
3. **Animate**:
   - entrances and exits with `applyMotionPreset` (it keys relative to where a layer rests);
   - sequencing with `staggerMotion` or `setLayerTiming`;
   - exact moves with `setKeyframes` (paths come from `getAnimation`);
   - always-on movement with `editBehaviours` (spin, sine drift, wiggle, audio-reactive);
   - per-letter or per-word type with `editTextAnimation`.
4. **Multi-scene pieces**: `createComposition` from frames, transitions with `editComposition`; with music, `detectAudioOnsets` then `cutToBeat`.
5. **Check** with `getAnimation` on the key layers, and export stills at key moments (`ext__popcraft__export`) to look at them.
6. **Video export** is in **popcraft-video**.

## Craft

- The hook lands in the first 500 ms.
- Keep something moving: no dead holds longer than about a second.
- Ease everything; linear motion only for constant spins and scrolls.
- Design each size you ship (9:16, 1:1, 16:9) as its own frame.
