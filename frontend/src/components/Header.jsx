import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import userIcon from "../assets/user.svg";

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
        <div className="flex h-16 justify-between items-center px-6 rounded-xl bg-slate-50">
            
            <h1 className="font-bold text-2xl">Job Tracker</h1>

            <div className="relative" ref={ref}>
                <button
                    onClick={() => setOpen(prev => !prev)}
                    className="flex w-10 h-10 rounded-full overflow-hidden focus:outline-none cursor-pointer bg-gray-600"
                >
                    <img
                        src={userIcon}
                        alt="profile"
                        className="p-1"
                    />
                </button>

                {open && (
                    <div className="absolute right-0 w-40 bg-white rounded-md shadow-lg transition">
                        <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
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