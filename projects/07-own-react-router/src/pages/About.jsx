import { useState } from 'react'
import { Link } from '../Components/Link.jsx'
import { Loading } from '../Components/Loading.jsx'
import { IL18N } from '../utils/consts.js'
import { useGlobalConf } from '../hooks/useGlobalConf.js'

export default function AboutPage() {
  const { lang } = useGlobalConf()
  const text = IL18N.aboutPage[lang]

  const [isLoading, setIsLoading] = useState(true)
  const handleLoad = () => {
    setIsLoading(false)
  }
  const imgDisplay = isLoading ? 'none' : 'block'

  return (
    <>
      <h1>{text.title}</h1>
      <div>
        <p>{text.description}</p>
        {isLoading && <Loading />}
        <img
          src="https://previews.123rf.com/images/yupiramos/yupiramos1705/yupiramos170514528/77978483-dise%C3%B1o-gr%C3%A1fico-del-ejemplo-del-vector-del-icono-del-perfil-del-hombre-joven.jpg"
          alt="Foto de ejemplo"
          onLoad={handleLoad}
          style={{
            display: imgDisplay,
          }}
        />
      </div>
      <Link to="/">{text.link}</Link>
    </>
  )
}
