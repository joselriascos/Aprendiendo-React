import { useState, useEffect } from 'react'
import { fetchFact } from '../services/facts'

export function useCatFact() {
  const [fact, setFact] = useState()

  const refreshFact = () => {
    fetchFact().then((newFact) => setFact(newFact))
  }

  // get fact when page loads
  useEffect(refreshFact, [])

  return { fact, refreshFact }
}
