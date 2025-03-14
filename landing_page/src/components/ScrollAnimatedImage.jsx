import React, { useState, useEffect, useRef } from 'react'

export function ScrollAnimatedImage({
  src,
  alt,
  classIfVisible,
  classIfNotVisible,
  id,
}) {
  const [isVisible, setIsVisible] = useState(false)
  const imageRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <img
      ref={imageRef}
      id={id}
      src={src}
      alt={alt}
      className={isVisible ? classIfVisible : classIfNotVisible}
    />
  )
}
