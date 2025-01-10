const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export const fetchFact = async () => {
  const response = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  //TODO: handle error if !response.ok
  const data = await response.json()
  return data.fact
}
