import axios from "axios"
import { useState } from "react"

export default function JobCard({ job, token, onJobDeleted }) {

    const [error, setError] = useState("");

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/jobs/${job.id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        }).then(response => {
            onJobDeleted(job.id)
        }).catch(error => {
            setError(error.message)
        })
    }

    return (
        <>
            <li className="text-xl border-2 rounded-xl border-solid border-black flex justify-between m-4 p-8">
                <span>{job.companyName}</span>
                <span>{job.jobTitle}</span>
                <span>{job.status}</span>
            
                <button 
                    onClick={handleDelete}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md"
                >Delete
                </button>
            </li>
            {error && <p>{error}</p>}
        </>
    )
}