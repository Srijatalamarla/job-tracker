import { useState } from "react"
import axiosInstance from "../api/axiosInstance";
import { motion } from "framer-motion";

export default function AddJobForm({ onFormClose, onJobAdded }) {

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

        axiosInstance.post('/jobs', data).then(response => {
            onJobAdded(response.data)
            setCompanyName("")
            setJobTitle("")
            setStatus("")
            onFormClose()
        }).catch(err => setError(err.message));
    }
    
    return (
        <>
              <motion.div 
                initial={{ x: "100%" }}   
                animate={{ x: 0 }}        
                exit={{ x: "100%" }}     
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 bg-white w-1/2 flex flex-col shadow-xl p-2"
              >
                    <button 
                        className="font-normal text-2xl px-4 py-2 rounded-full hover:bg-gray-100 mr-auto transition duration-500 ease"
                        onClick={onFormClose}
                    >
                        x
                    </button>
                    <form onSubmit={handleSubmit} className="mt-4 pt-4 px-8 flex flex-col gap-6">
                        <div className="flex items-center">
                            <label 
                                htmlFor="companyName"
                                className="w-24 text-gray-500"
                            >
                                Company Name
                            </label>
                            <input
                                id="companyName"
                                type="text"
                                placeholder="company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="flex-1 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
                            />
                        </div>
                        <div className="flex items-center">
                            <label 
                                htmlFor="jobTitle"
                                className="w-24 text-gray-700"
                            >
                                Job Title
                            </label>
                            <input
                                id="jobTitle"
                                type="text"
                                placeholder="job title"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                className="flex-1 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
                            />
                        </div>
                        <div className="flex items-center">
                            <label 
                                htmlFor="status"
                                className="w-24 text-gray-700"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="flex-1 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
                            >
                                <option value="">select status</option>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Selected">Selected</option>
                                <option value="Offered">Offered</option>
                            </select>
                        </div>
                        <button type="submit" className="mt-6 py-2 text-white rounded-md bg-[#0f1419] hover:bg-[#0f1419]/90 focus:ring-4 focus:outline-none focus:ring-[#0f1419]/50 font-medium">
                            Save
                        </button>
                    </form>
                    {error && <p>Error: {error}</p>}
                </motion.div>
        </>
    )
}