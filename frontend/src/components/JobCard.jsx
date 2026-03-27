import { useState } from "react"
import axiosInstance from "../api/axiosInstance";

export default function JobCard({ job, onJobUpdated, onJobDeleted }) {

    const [error, setError] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        companyName: job.companyName,
        jobTitle: job.jobTitle,
        status: job.status
    })

    const handleUpdate = () => {
        axiosInstance.put(`/jobs/${job.id}`, editData)
            .then(response => {
                console.log(response)
                onJobUpdated(response.data)
                setIsEditing(false)
            }).catch(error => {
                setError(error.message)
            })
    }

    const handleDelete = () => {
        axiosInstance.delete(`/jobs/${job.id}`).then(response => {
            onJobDeleted(job.id)
        }).catch(error => {
            setError(error.message)
        })
    }

    return (
        <>
            <li className="text-xl border-2 rounded-xl border-solid border-black m-4 p-8">
                {!isEditing ? (
                    <div className="flex justify-evenly">
                        <span>{job.companyName}</span>
                        <span>{job.jobTitle}</span>
                        <span>{job.status}</span>

                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-black text-white font-semibold rounded-md shadow-md"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-black text-white font-semibold rounded-md shadow-md"
                        >Delete
                        </button>
                    </div>
                 ) : (
                    <div className="flex justify-evenly">
                        <input
                            type="text"
                            value={editData.companyName}
                            onChange={(e) => setEditData(prev => ({...prev, companyName: e.target.value}))}
                        />
                        <input
                            type="text"
                            value={editData.jobTitle}
                            onChange={(e) => setEditData(prev => ({...prev, jobTitle: e.target.value}))}
                        />
                        <select
                            value={editData.status}
                            onChange={(e) => setEditData(prev => ({...prev, status: e.target.value}))}
                        >
                            <option value="">Select Status</option>
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Selected">Selected</option>
                            <option value="Offered">Offered</option>
                        </select>
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 bg-black text-white font-semibold rounded-md shadow-md"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-black text-white font-semibold rounded-md shadow-md"
                        >
                            Cancel
                        </button>
                    </div>  
                )}
            </li>
            {error && <p>{error}</p>}
        </>
    )
}