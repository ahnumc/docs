import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { test } from 'node:test'

const guideUrl = new URL('../../docs/getting-started/index.md', import.meta.url)
const assetsUrl = new URL('../../docs/getting-started/assets/', import.meta.url)

async function loadAssetState() {
  const [guide, files] = await Promise.all([
    readFile(guideUrl, 'utf8'),
    readdir(assetsUrl),
  ])
  const references = [...guide.matchAll(/\.\/assets\/([^\s)"']+)/g)].map((match) => match[1])

  return { files: files.sort(), references: references.sort() }
}

test('every quick-start image reference resolves to an asset', async () => {
  const { files, references } = await loadAssetState()

  assert.deepEqual(references.filter((name) => !files.includes(name)), [])
})

test('the quick-start asset directory contains no unreferenced images', async () => {
  const { files, references } = await loadAssetState()

  assert.deepEqual(files.filter((name) => !references.includes(name)), [])
})

test('quick-start image names follow chapter-order numbering', async () => {
  const { files } = await loadAssetState()

  assert.deepEqual(files.filter((name) => !/^[1-4]-[1-9][0-9]*\.png$/.test(name)), [])
})
