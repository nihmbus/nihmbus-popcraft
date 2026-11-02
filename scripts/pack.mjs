#!/usr/bin/env node
// Build dist/nihmbus-popcraft-<version>.json: the manifest plus every skill, in the `{ manifest, skills }` package
// shape Nihmbus installs from a URL (Extensions → Install from URL). The release attaches it.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const manifest = JSON.parse(readFileSync(join(root, 'nihmbus.extension.json'), 'utf8'))

/** The SKILL.md frontmatter subset these skills use: `key: value` scalars and `- item` block lists. */
function parseSkill(raw) {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw)
  if (!m) throw new Error('SKILL.md has no frontmatter')
  const frontmatter = {}
  let listKey = null
  for (const line of m[1].split('\n')) {
    const item = /^\s+-\s+(.*)$/.exec(line)
    if (item && listKey) {
      frontmatter[listKey].push(item[1].trim())
      continue
    }
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line)
    if (!kv) continue
    listKey = kv[2].trim() === '' ? kv[1] : null
    frontmatter[kv[1]] = listKey ? [] : kv[2].trim()
  }
  return { frontmatter, body: m[2].trim() }
}

const skills = manifest.skills.map(({ path }) => parseSkill(readFileSync(join(root, path, 'SKILL.md'), 'utf8')))
mkdirSync(join(root, 'dist'), { recursive: true })
const out = join(root, 'dist', `nihmbus-popcraft-${manifest.version}.json`)
writeFileSync(out, JSON.stringify({ manifest, skills }))
console.log(out)
