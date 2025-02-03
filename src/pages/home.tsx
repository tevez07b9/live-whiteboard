import CreateRoomButton from '@/components/create-room-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getUser, isValidURL, removeUser } from '@/utils'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  useEffect(() => {
    const storedName = getUser()
    if (!storedName) {
      navigate('/login')
    } else {
      setUsername(storedName)
    }
  }, [navigate])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const link = formData.get('roomLink') as string
    if (link && isValidURL(link)) {
      window.location = link as Location | (string & Location)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-col gap-8 bg-card w-96">
        <div className="flex items-center justify-between gap-8 w-full">
          <h1 className="text-xl">Welcome, {username}!</h1>
          <Button
            variant="destructive"
            onClick={() => {
              removeUser()
              navigate('/login')
            }}
          >
            Logout
          </Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm items-center space-x-2"
        >
          <Input type="text" name="roomLink" placeholder="Join a room" />
          <Button variant="outline" type="submit">
            Join
          </Button>
        </form>
        <CreateRoomButton />
      </div>
    </div>
  )
}

export default Home
