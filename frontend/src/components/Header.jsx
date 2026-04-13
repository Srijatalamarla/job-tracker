import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function Header() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        try{
            await axiosInstance.post('/auth/logout', {refreshToken: localStorage.getItem('refreshToken')})
        } catch(e) {
            console.error("Logout failed.")
        }
        finally {       
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')

            navigate('/login')
        }
    }

    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex h-16 justify-between items-center bg-gray-100 px-6 rounded-xl">
            
            <h1 className="font-bold text-2xl">Job Tracker</h1>

            <div className="relative" ref={ref}>
                <button
                    onClick={() => setOpen(prev => !prev)}
                    className="flex rounded-full focus:outline-none cursor-pointer"
                >
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                    />
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg transition">
                        <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={handleLogout}
                        >
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}