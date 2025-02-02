export function Loading() {
  return (
    <div className="loading">
      <div className="loading__inner">
        <div
          className="loading__circle"
          style={{
            width: '8em',
            height: '8em',
            borderRadius: '50%',
            border: '#ffae0e 5px solid',
            backgroundColor: 'transparent',
            boxShadow: '0px 0px 20px 5px #ffae0e',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
        >
          Cargando...
        </div>
      </div>
    </div>
  )
}
