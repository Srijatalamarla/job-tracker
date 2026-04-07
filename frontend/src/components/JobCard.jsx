import { useState } from "react"
import axiosInstance from "../api/axiosInstance";
import editIcon from "../assets/edit.svg"
import deleteIcon from "../assets/delete.svg"
import tickIcon from "../assets/tick.svg"
import cancelIcon from "../assets/cancel.svg"

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
            <tr className="font-medium border-b border-gray-300 py-4">
                {!isEditing ? (
                    <>
                        <td className="border-r border-gray-300">{job.companyName}</td>
                        <td className="border-r border-gray-300 pl-2">{job.jobTitle}</td>
                        <td className="border-r border-gray-300 pl-2">
                            <span className="px-2 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                                {job.status}
                            </span>
                        </td>
                        <td>
                            <div className="flex items-center justify-evenly">
                                <button
                                    onClick={() => setIsEditing(true)}
                                >
                                    <img src={editIcon} alt="edit" className="p-1 h-8 object-contain hover:bg-gray-100 rounded-full transition duration-500 ease-in-out" />
                                </button>
                                <button
                                    onClick={handleDelete}
                                >
                                    <img src={deleteIcon} alt="delete" className="p-1 h-8 object-contain hover:bg-gray-100 rounded-full transition duration-500 ease-in-out" />
                                </button>
                            </div>
                        </td>
                    </>
                 ) : (
                    <>
                        <td className="border-r border-gray-300">
                            <input
                                type="text"
                                value={editData.companyName}
                                onChange={(e) => setEditData(prev => ({...prev, companyName: e.target.value}))}
                                className="w-full outline-none"
                            />
                        </td>
                        <td className="border-r border-gray-300 pl-2">
                            <input
                                type="text"
                                value={editData.jobTitle}
                                onChange={(e) => setEditData(prev => ({...prev, jobTitle: e.target.value}))}
                                className="w-full outline-none"

                            />
                        </td>
                        <td className="border-r border-gray-300 pl-2">
                            <select
                                value={editData.status}
                                onChange={(e) => setEditData(prev => ({...prev, status: e.target.value}))}
                                className="w-full outline-none"
                            >
                                <option value="">Select Status</option>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Selected">Selected</option>
                                <option value="Offered">Offered</option>
                            </select>
                        </td>
                        <td>
                            <div className="flex items-center justify-evenly">
                                <button
                                    onClick={handleUpdate}
                                >
                                    <img src={tickIcon} alt="update/save" className="p-1 h-8 object-contain hover:bg-green-100 rounded-full transition duration-500 ease-in-out"/>
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                >
                                    <img src={cancelIcon} alt="cancel" className="p-1 h-8 object-contain hover:bg-red-100 rounded-full transition duration-500 ease-in-out" />
                                </button>
                            </div>
                        </td>
                    </>  
                )}
            </tr>
            {error && <p>{error}</p>}
        </>
    )
}