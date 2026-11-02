#!/usr/bin/env node
// Sanity checks for the extension package: manifest shape, tool names, skills present with valid frontmatter.
// Usage: node scripts/check.mjs
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const fail = (msg) => {
  console.error('✖ ' + msg)
  process.exitCode = 1
}
const m = JSON.parse(readFileSync(join(root, 'nihmbus.extension.json'), 'utf8'))

if (!/^[a-z0-9][a-z0-9-]*$/.test(m.name)) fail('name must be lowercase alphanumerics + hyphens')
if (!m.permissions?.includes('device')) fail('the device block needs the "device" permission')
const tools = m.device?.tools ?? []
if (!tools.length) fail('device.tools is empty')
const seen = new Set()
for (const t of tools) {
  if (!/^[a-z][a-z0-9_]{0,39}$/.test(t.name)) fail(`bad tool name: ${t.name}`)
  if (seen.has(t.name)) fail(`duplicate tool: ${t.name}`)
  seen.add(t.name)
  if (!(t.timeoutMs >= 1000 && t.timeoutMs <= 30 * 60_000)) fail(`${t.name}: timeoutMs out of range`)
  if (JSON.stringify(t.inputSchema ?? {}).includes('$ref')) fail(`${t.name}: inline schemas only (no $ref)`)
}
const names = new Set()
for (const { path } of m.skills ?? []) {
  const file = join(root, path, 'SKILL.md')
  if (!existsSync(file)) {
    fail(`missing ${path}/SKILL.md`)
    continue
  }
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(readFileSync(file, 'utf8'))?.[1] ?? ''
  const name = /^name:\s*(.+)$/m.exec(fm)?.[1]?.trim()
  const desc = /^description:\s*(.+)$/m.exec(fm)?.[1]?.trim()
  if (!name || !desc) fail(`${path}: frontmatter needs name and description`)
  if (names.has(name)) fail(`duplicate skill name ${name}`)
  names.add(name)
}
if (!process.exitCode) console.log(`✓ ${m.name} ${m.version}: ${tools.length} device tools, ${names.size} skills`)
