import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <>
            <p>Home Page</p>
            <button onClick={() => { navigate('\login')}}>Sign In</button>
        </>
    )
}