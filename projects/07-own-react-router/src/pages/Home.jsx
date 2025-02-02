import { Link } from '../Components/Link.jsx'
import { useGlobalConf } from '../hooks/useGlobalConf.js'
import { IL18N } from '../utils/consts.js'

export default function HomePage() {
  const { lang } = useGlobalConf()
  const text = IL18N.homePage[lang]

  return (
    <>
      <h1>{text.title}</h1>
      <p>{text.description}</p>
      <Link to="/about">{text.link_to_about_us}</Link> <br />
      <Link to="/search">{text.link_to_search}</Link>
    </>
  )
}
