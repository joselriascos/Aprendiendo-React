import { useEffect, useState } from 'react'

function App() {

  const [ enabled, setEnabled ] = useState(false)
  const  [ position, setPosition ] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log(clientX, clientY)
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener("pointermove", handleMove)
    }
    return () => {
      // limpiar el efecto
      // Se ejecuta cuando el componente se desmonta
      // o cuando cambia la dependencia, antes de ejecutar el efecto
      // nuevamente
      window.removeEventListener("pointermove", handleMove)
      setPosition({ x: 0, y: 0 })
    }
  }, [enabled])

  return (
    <>
      <main>
        <div style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        />
        <button onClick={() => setEnabled(!enabled)}>
          {enabled ? "Desactivar" : "Activar"} seguir puntero
        </button>
      </main>
    </>
  )
}

export default App
