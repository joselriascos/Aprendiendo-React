import { EVENTS } from '../utils/consts'

export function navigate(href) {
  window.history.pushState({}, '', href)
  //Crear un evento personalizado
  const navigationEvent = new Event(EVENTS.PUSH_EVENT)
  window.dispatchEvent(navigationEvent)
}
