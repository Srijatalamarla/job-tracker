import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Jobs from "./pages/Jobs"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Jobs/>
        </ProtectedRoute>
      }/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>} />
    </Routes>
  )
}