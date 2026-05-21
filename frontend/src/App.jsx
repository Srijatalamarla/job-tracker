import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Jobs from "./pages/Jobs"
import ProtectedRoute from "./components/ProtectedRoute"
import { useEffect, useState } from "react"
import SessionExpiredModal from "./components/SessionExpiredModal"
import Home from "./pages/Home"

export default function App() {
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const handler = () => setSessionExpired(true);
    window.addEventListener('session-expired', handler)
    return () => window.removeEventListener('session-expired', handler)
  }, [])

  return (
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/jobs" element={
        <ProtectedRoute>
          <Jobs/>
          <SessionExpiredModal isExpired={sessionExpired} />
        </ProtectedRoute>
      }/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>} />
    </Routes>
  )
}