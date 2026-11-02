# PopCraft for Nihmbus

A [Nihmbus](https://nihmbus.ai) extension that lets agents design graphics, motion and video in
[PopCraft](https://popcraft.app): in **your own PopCraft editor**, on the web or in the desktop app.

```
Nihmbus agent ──▶ Nihmbus ◀── long-poll ── Nihmbus plugin, running in your PopCraft editor
```

- **This repo** is the Nihmbus side: the extension manifest (the device tools the agent gets) and the skills that
  teach agents how to use PopCraft well.
- **[getpopcraft/popcraft-plugin-nihmbus](https://github.com/getpopcraft/popcraft-plugin-nihmbus)** is the PopCraft
  side: a PopCraft plugin that connects to Nihmbus and runs the tools.
- The relay between them (pairing, polling, uploads) is a general Nihmbus feature,
  [extension devices](https://github.com/nihmbus/nihmbus/blob/main/docs/extension-devices.md). Nothing here is
  built into Nihmbus or PopCraft.

## What agents can do

| Tool | |
|---|---|
| `ext__popcraft__status` | The open page, its layers, the selection |
| `ext__popcraft__call` | Run PopCraft plugin API methods: build and edit layers, text, styles, components, keyframes, motion presets, compositions, prototypes… |
| `ext__popcraft__export` | Export a layer as PNG, JPG, WEBP, SVG or PDF and get a URL |

Skills: `popcraft` (setup, docs, connecting), `popcraft-graphics`, `popcraft-motion`, `popcraft-video`,
`popcraft-social`.

Not yet possible through the plugin: video export (MP4/GIF) and PopCraft's AI generation. The PopCraft plugin API
doesn't offer them yet; the `popcraft-video` skill explains the workarounds. Agents with a shell on your machine can
use the PopCraft CLI for those.

## Set up

1. **Install the extension** in Nihmbus: **Extensions → Install from Git →** `nihmbus/nihmbus-popcraft`. Grant it
   **device** access.
2. **Install the plugin** in PopCraft: main menu → **Manage plugins…** → search **Nihmbus** → **Install** (or
   **Install from file…** with a zip from the plugin's releases).
3. **Connect:** in Nihmbus, **Extensions → PopCraft → Connect PopCraft** shows a code. In PopCraft, run
   **Plugins → Nihmbus → Connect** and enter it.
4. Keep the plugin running while agents work. Hiding its panel is fine; closing it or the PopCraft tab disconnects.

Your connected PopCraft is yours alone: only your own agent runs can use it, and you can disconnect it any time from
either side.

## Develop

```sh
node scripts/check.mjs      # manifest + skills sanity checks
```

- [`nihmbus.extension.json`](nihmbus.extension.json): the manifest. Format:
  [extension author guide](https://github.com/nihmbus/nihmbus/blob/main/docs/extensions.md).
- [`docs/tools.md`](docs/tools.md): the tool contract the plugin implements. A change that breaks it bumps
  `device.protocol` here and in the plugin, together.
- [`skills/`](skills): one folder per skill, each a self-contained `SKILL.md`.

## License

[MIT](LICENSE)
