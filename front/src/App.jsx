import io from 'socket.io-client'
import { useState, useEffect } from 'react'

const socket = io("/")
function App() {
  const [mensaje, setMensaje] = useState('')
  const [mensajes, setMensajes] = useState([])


  const handleSubmit = (e) => {
    e.preventDefault()
    const newMsg = {
      body: mensaje,
      from: 'Yo',
      date: '05/10/2023'
    }
    setMensajes([...mensajes, newMsg])
    socket.emit('chatMensaje', mensaje)
  }

  useEffect(() => {
    socket.on('mensajeBroad', reciveMsg)
    return () => {
      socket.off('mensajeBroad', reciveMsg)
    }
  }, [])

  const reciveMsg = (msg) => setMensajes((state) => [...state, msg])
  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">

      <form onSubmit={handleSubmit}>
        <input className="border-2 border-zinc-500 p-2 w-full text-black" type="text" placeholder='mensaje' onChange={(e) => setMensaje(e.target.value)} />
        <button>Enviar</button>
      </form>
      <ul className="h-80 overflow-y-auto">
        {mensajes.map((message, index) => (
          <li
            key={index}
            className={`my-2 p-2 table text-sm rounded-md ${message.from === "Me" ? "bg-sky-700 ml-auto" : "bg-black"
              }`}
          >
            <b>{message.from}</b>:{message.body}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App