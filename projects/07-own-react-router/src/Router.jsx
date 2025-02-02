import { Children, useEffect, useState } from 'react'
import { EVENTS } from './utils/consts.js'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './utils/functions.js'

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener(EVENTS.PUSH_EVENT, onLocationChange)
    window.addEventListener(EVENTS.POP_EVENT, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSH_EVENT, onLocationChange)
      window.removeEventListener(EVENTS.POP_EVENT, onLocationChange)
    }
  }, [])

  let routeParams = {}

  /* Agregar las rutas que vienen de los componentes <Route /> */

  const routesFromChildren = Children.map(children, (child) => {
    const { props, type } = child
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean) //Elimina los valores falsy como null o undefined 

  const Page = routesToUse.find((route) => {
    if (route.path === currentPath) return true

    /* Uso de path-to-regexp para 
    poder detectar rutas dinámicas como
    por ejemplo : /search/:query */
    const matcherUrl = match(route.path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    /* Guardar los parámetros de la url que eran dinámicos
    y que hemos extraído con path-to-regexp. Por ejemplo,
    si la ruta es /search/:query y la url es /search/javascript
    matched.params.query === 'javascript' */
    routeParams = matched.params
    return true
  })?.Component

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  )
}
