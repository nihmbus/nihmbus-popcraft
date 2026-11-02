#!/usr/bin/env node
// Set the extension's version in nihmbus.extension.json and package.json, keeping their formatting.
// The release workflow runs it with the version sem picked.   node scripts/set-version.mjs 1.2.3
import { readFileSync, writeFileSync } from 'node:fs'

const version = process.argv[2]
if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(version ?? '')) {
  console.error('Usage: node scripts/set-version.mjs <semver>')
  process.exit(1)
}
for (const file of ['nihmbus.extension.json', 'package.json']) {
  const text = readFileSync(file, 'utf8')
  const next = text.replace(/^(\s{2}"version":\s*")[^"]*(")/m, `$1${version}$2`)
  if (JSON.parse(next).version !== version) throw new Error(`${file}: could not set "version"`)
  writeFileSync(file, next)
}
console.log(`version ${version}`)
