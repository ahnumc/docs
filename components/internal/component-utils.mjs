export function nextTabIndex(currentIndex, key, count) {
  if (count <= 0) return -1

  const normalizedIndex = currentIndex < 0 || currentIndex >= count ? 0 : currentIndex

  if (key === 'ArrowRight') return (normalizedIndex + 1) % count
  if (key === 'ArrowLeft') return (normalizedIndex - 1 + count) % count
  if (key === 'Home') return 0
  if (key === 'End') return count - 1

  return normalizedIndex
}

export async function copyText(value, writeText) {
  const clipboardWriter = writeText === undefined
    ? globalThis.navigator?.clipboard?.writeText?.bind(globalThis.navigator.clipboard)
    : writeText

  if (typeof clipboardWriter !== 'function') return 'failed'

  try {
    await clipboardWriter(value)
    return 'copied'
  } catch {
    return 'failed'
  }
}
