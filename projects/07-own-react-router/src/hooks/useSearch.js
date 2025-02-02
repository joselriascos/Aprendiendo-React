import { useEffect, useState } from 'react'

export function useSearch({ text, routeParams }) {
  const [search, setSearch] = useState(routeParams.query || '')

  useEffect(() => {
    document.title = routeParams.query
      ? `${text.title_first_part} ${routeParams.query}`
      : `${text.title_second_part}`

    return () => {
      document.title = 'My React Router'
    }
  }, [routeParams.query, text])

  return { search, setSearch }
}
