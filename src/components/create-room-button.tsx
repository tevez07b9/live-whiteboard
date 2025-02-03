import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { createRoom } from '@/services/room'

const CreateRoomButton = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleCreateRoom = async () => {
    setLoading(true)
    try {
      const response = await createRoom()
      const roomId = response.data.roomId
      navigate(`/room/${roomId}`)
    } catch (error) {
      console.error('Error creating room', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleCreateRoom} disabled={loading}>
      {loading ? 'Creating Room...' : 'Create Room'}
    </Button>
  )
}

export default CreateRoomButton
