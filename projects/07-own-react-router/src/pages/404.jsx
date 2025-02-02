import { Link } from '../Components/Link.jsx'
import { useGlobalConf } from '../hooks/useGlobalConf.js'
import { IL18N } from '../utils/consts.js'

export default function Error404() {
  const { lang } = useGlobalConf()
  const text = IL18N.error404Page[lang]

  return (
    <div className="error-404">
      <h1>404</h1>
      <p>{text.description}</p>
      <Link to="/">{text.link}</Link>
    </div>
  )
}
