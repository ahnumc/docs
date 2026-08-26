import assert from 'node:assert/strict'
import { test } from 'node:test'

import { copyText, nextTabIndex } from './component-utils.mjs'

test('ArrowRight wraps from the final tab to the first tab', () => {
  assert.equal(nextTabIndex(2, 'ArrowRight', 3), 0)
})

test('ArrowLeft wraps from the first tab to the final tab', () => {
  assert.equal(nextTabIndex(0, 'ArrowLeft', 3), 2)
})

test('Home and End select the boundary tabs', () => {
  assert.equal(nextTabIndex(1, 'Home', 3), 0)
  assert.equal(nextTabIndex(1, 'End', 3), 2)
})

test('an unrelated key keeps the current tab selected', () => {
  assert.equal(nextTabIndex(1, 'Enter', 3), 1)
})

test('an empty tab list has no selected index', () => {
  assert.equal(nextTabIndex(0, 'ArrowRight', 0), -1)
})

test('an invalid current index is normalized before arrow navigation', () => {
  assert.equal(nextTabIndex(-1, 'ArrowRight', 3), 1)
  assert.equal(nextTabIndex(-1, 'ArrowLeft', 3), 2)
})

test('a single tab remains selected for either arrow key', () => {
  assert.equal(nextTabIndex(0, 'ArrowRight', 1), 0)
  assert.equal(nextTabIndex(0, 'ArrowLeft', 1), 0)
})

test('copyText passes the exact value to the writer', async () => {
  let writtenValue = ''
  const result = await copyText('play.ahnumc.org', async (value) => {
    writtenValue = value
  })

  assert.equal(result, 'copied')
  assert.equal(writtenValue, 'play.ahnumc.org')
})

test('copyText reports failure when no clipboard writer is available', async () => {
  assert.equal(await copyText('play.ahnumc.org', null), 'failed')
})

test('copyText reports failure when the writer rejects', async () => {
  const result = await copyText('play.ahnumc.org', async () => {
    throw new Error('permission denied')
  })

  assert.equal(result, 'failed')
})
