import { motion } from "framer-motion";

export default function SessionExpiredModal({ isExpired }) {

    const handleSignOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        // to be modified as home page
        window.location.href = '/login'
    }

    const handleSignIn = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
    }

    return (
        <>
            {isExpired && 
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col bg-white rounded-xl shadow-xl p-6 max-w-sm w-full"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2 tracking-wide">Session Expired</h2>
                            <p className="text-sm text-gray-500 tracking-tight">Your session has expired. Please log in again to continue.</p>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button onClick={handleSignOut} className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors duration-300">Sign Out</button>
                            <button onClick={handleSignIn} className="px-4 py-2 text-sm rounded-md bg-[#0f1419] text-white hover:bg-[#0f1419]/90 cursor-pointer transition-colors duration-300">Sign In</button>
                        </div>
                    </motion.div>
                </motion.div>
            }
        </>
    )
}