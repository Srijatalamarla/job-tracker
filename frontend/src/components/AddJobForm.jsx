import { useState } from "react"
import axios from "axios"

export default function AddJobForm({ token, onJobAdded }) {

    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [status, setStatus] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            "companyName": companyName,
            "jobTitle": jobTitle,
            "status": status,
        }

        axios.post('http://localhost:8080/jobs', data, {
            headers: { "Authorization": `Bearer ${token}` }
        }).then(response => {
            onJobAdded(response.data)
            setCompanyName("")
            setJobTitle("")
            setStatus("")
        }).catch(err => setError(err.message));
    }
    
    return (
        <>
              <div className="w-1/2 h-1/2 flex flex-col p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="companyName">Company Name</label>
                            <input
                                id="companyName"
                                type="text"
                                placeholder="companyName"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="jobTitle">Job Title</label>
                            <input
                                id="jobTitle"
                                type="text"
                                placeholder="jobTitle"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">Select Status</option>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Selected">Selected</option>
                                <option value="Offered">Offered</option>
                            </select>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
                            Submit
                        </button>
                    </form>
                    {error && <p>Error: {error}</p>}
                </div>
        </>
    )
}