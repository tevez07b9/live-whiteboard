import { getUser } from '@/utils'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Canvas from '@/components/canvas'
import { CanvasProvider } from '@/context/canvas-context'

const RoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const [ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    const username = getUser()
    const socket = new WebSocket(
      `${import.meta.env.VITE_SOCKET_URL}?room=${roomId}&username=${username}`
    )

    socket.onopen = () => {
      console.log('WebSocket connected')
      // Join room event
      socket.send(
        JSON.stringify({
          event: 'join-room',
          data: { roomId, username },
        })
      )
    }

    setWs(socket)

    // Cleanup on unmount
    return () => {
      socket.close()
      setWs(null)
    }
  }, [roomId])

  return (
    <div className="flex w-full min-h-screen p-4">
      <div className="w-full rounded-md border-2 border-gray-400">
        <CanvasProvider>
          <Canvas socket={ws} roomId={roomId} />
        </CanvasProvider>
      </div>
    </div>
  )
}

export default RoomPage
