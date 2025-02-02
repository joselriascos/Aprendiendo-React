import { lazy } from 'react'
import { Suspense } from 'react'

// import AboutPage from './pages/About.jsx' => import estático, se carga sí o sí al iniciar App.jsx
// import HomePage from './pages/Home.jsx'
// import SearchPage from './pages/Search.jsx'
import Error404 from './pages/404.jsx'
import { Loading } from './Components/Loading.jsx'
import { ConfSection } from './Components/ConfSection.jsx'
import { Route } from './Components/Route.jsx'
import { Router } from './Router.jsx'

const AboutPage = lazy(() => import('./pages/About.jsx')) // => import dinámico, se carga solo cuando se necesite
const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))

const appRoutes = [
  {
    path: '/search/{:query}', // dynamic route => query es el parámetro
    Component: SearchPage,
  },
]

//TODO: Lenguaje en contexto global

function App() {
  return (
    <>
      <header>
        <ConfSection />
      </header>
      <main>
        <Suspense fallback={<Loading />}>
          <Router routes={appRoutes} defaultComponent={Error404}>
            <Route path="/" Component={HomePage} />
            <Route path="/about" Component={AboutPage} />
            <Route path="/search" Component={SearchPage} />
          </Router>
        </Suspense>
      </main>
    </>
  )
}

export default App
