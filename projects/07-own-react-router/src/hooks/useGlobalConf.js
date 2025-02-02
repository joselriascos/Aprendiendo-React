import { useContext } from 'react'
import { GlobalConf } from '../contexts/globalConf'

export const useGlobalConf = () => {
  const globalConf = useContext(GlobalConf)

  return globalConf
}
