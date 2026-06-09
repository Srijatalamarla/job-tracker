import { useNavigate } from "react-router-dom";
import demoImage from "../assets/demo.png"
import logo from "../assets/logo-light.svg"

export default function Home() {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex justify-center px-4 h-screen">
                <div className="w-full max-w-7xl mt-4">
                    {/* Header */}
                    <div className="flex h-16 justify-between items-center px-6 rounded-xl bg-white">
                                
                        <div className="flex gap-1 items-center">
                            <img src={logo} alt="logo"className="h-10" />
                            <h1 className="font-bold text-2xl">Job Tracker</h1>
                        </div>

                        <div>
                            <button 
                                onClick={ () => { navigate('\login') } }
                                className="focus:outline-none cursor-pointer text-black shadow-md hover:bg-black hover:text-white px-4 py-2 rounded-md transition-colors duration-500 border-solid border-1 border-gray-400"
                            >Sign In</button>
                        </div>
                    </div>

                    {/* Hero */}
                    <div className="mt-2 px-6 h-100 flex flex-col justify-center">
                        <h2 className="text-3xl tracking-wide font-bold">Your Job Search Organized</h2>
                        <span className="text-md tracking-tight text-gray-600">A centralized dashboard to manage applications, track interview stages and land your next role</span>
                        <div className="flex gap-2 items-start">
                            <button onClick={ () => { navigate('/login') } }>Start</button>
                            <button>GitHub</button>
                        </div>
                    </div>

                    {/* Demo */}
                    <div className="px-6">
                        <span>Demo</span>
                        <img src={demoImage} alt="jobs dashboard" className="shadow-md rounded-lg p-4"/>
                    </div>

                    <div className="px-6 py-10">
                        Footer
                    </div>
                </div>
            </div>
        </>
    )
}