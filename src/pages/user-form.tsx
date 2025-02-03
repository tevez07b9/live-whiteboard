import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { setUser } from '@/utils'
import { useNavigate } from 'react-router-dom'

const UserForm = () => {
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('username') as string
    if (!name.trim()) return
    setUser(name)
    navigate('/')
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Name</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="text" name="username" placeholder="Your name" />
            <Button type="submit" className="w-full">
              Start
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default UserForm
