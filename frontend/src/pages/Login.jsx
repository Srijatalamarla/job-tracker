import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Login() {
    
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            "email": email,
            "password": password
        }
        
        axiosInstance.post('/auth/login', data)
             .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('refreshToken', response.data.refreshToken)

                navigate('/')
             })
             .catch(err => {
                setError(err.response?.data || "Login failed")
             });
    }
    
    return (
        <>
            <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 md:p-12 p-8">
                <h1 className="text-2xl font-bold tracking-wide text-center mb-8">Sign in to your account</h1>    
                <div className="max-w-lg w-full flex flex-col p-8 rounded-xl bg-white shadow-lg border border-gray-100">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-2 font-medium">Email address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email..."
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-2 font-medium">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password..."
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <button type="submit" className="mt-6 py-2 text-white rounded-md bg-[#0f1419] hover:bg-[#0f1419]/90 focus:ring-4 focus:outline-none focus:ring-[#0f1419]/50 font-medium">
                            Sign in
                        </button>
                    </form>
                    {error && <p className="text-red-600 text-center mt-3 text-sm">Error: {error}</p>}
                    <p className="mt-4 text-center text-sm">Don't have an account? <span className="text-blue-600 hover:underline cursor-pointer font-medium" onClick={() => navigate("/register")}>Sign Up</span></p>
                </div>
            </div>
        </>
    )
}