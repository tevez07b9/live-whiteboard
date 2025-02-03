import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import UserForm from './pages/user-form'
import RoomPage from './pages/room'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserForm />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </Router>
  )
}

export default App
