import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useScrollToHash = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    const { hash } = location

    const removeHashtag = (str) => {
      const result = str.slice(1)
      return result
    }

    if (hash) {
      const element = document.getElementById(removeHashtag(hash))

      if (element) {
        element.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
          inline: 'nearest',
        })
      }
    }
  }, [location])

  return location
}
