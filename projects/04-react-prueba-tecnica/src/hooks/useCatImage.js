import { useState, useEffect } from 'react'

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  // get image when fact changes
  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')
    const url = `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red`
    setImageUrl(url)
  }, [fact])
  return { imageUrl }
}
