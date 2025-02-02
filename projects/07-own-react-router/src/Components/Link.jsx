import { BUTTONS } from '../utils/consts.js'
import { navigate } from '../services/functions.js'

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTONS.PRIMARY //primary click (izquierdo normalmente)
    const isModifiedEvent =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey //tecla modificadora
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to)
    }
  }

  return <a onClick={handleClick} href={to} target={target} {...props} />
}
