export async function fetchData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch {
    return {}
  }
}

export function checkVisibilityAndScroll({ element, container }) {
  if (!container || !element) return

  const containerRect = container.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()

  const isBelow = elementRect.bottom > containerRect.bottom
  const isAbove = elementRect.top < containerRect.top

  if (isBelow) {
    container.scrollTop += elementRect.height
    return
  }

  if (isAbove) {
    container.scrollTop -= elementRect.height
    return
  }
}
