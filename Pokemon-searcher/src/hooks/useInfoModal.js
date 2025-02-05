import { useState, useEffect } from "react"
import { API_FCC } from "../utils/consts.js"
import { fetchData } from "../utils/functions.js"

export function useInfoModal({ id }) {
  const [data, setData] = useState(null)
  const [actualImage, setActualImage] = useState('front_default')
  

  const nextImage = () => {
    if (data?.sprites) {
      const spriteKeys = Object.keys(data.sprites)
      const currentKey = spriteKeys.indexOf(actualImage)
      const nextKey = (currentKey + 1) % spriteKeys.length
      setActualImage(spriteKeys[nextKey])
    }
  }

  const prevImage = () => {
    if (data?.sprites) {
      const spriteKeys = Object.keys(data.sprites)
      const currentKey = spriteKeys.indexOf(actualImage)
      const prevKey =
        currentKey - 1 >= 0 ? currentKey - 1 : spriteKeys.length - 1
      setActualImage(spriteKeys[prevKey])
    }
  }

  useEffect(() => {
    if (id) {
      const url = API_FCC + id
      try {
        fetchData(url).then((newData) => setData(newData))
      } catch (error) {
        throw new Error('Error fetching data: ' + error)
      }
    }
    return () => setData(null)
  }, [id])

  return { data, actualImage, nextImage, prevImage }
}
