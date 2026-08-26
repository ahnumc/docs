import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

const packageJson = JSON.parse(
  await readFile(new URL('../../package.json', import.meta.url), 'utf8'),
)

test('VitePress scripts use docs as the site root', () => {
  assert.equal(packageJson.scripts['docs:dev'], 'vitepress dev docs')
  assert.equal(packageJson.scripts['docs:build'], 'vitepress build docs')
  assert.equal(packageJson.scripts['docs:preview'], 'vitepress preview docs')
})
