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
                className={`fixed inset-y-0 right-0 bg-white w-full md:w-3/4 lg:w-1/2 flex flex-col shadow-xl p-2`}
              >
                    <div>
                        <button
                            onClick={onFormClose}
                            className="text-black hover:text-gray-700 hover:bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                        >
                            ✕
                        </button>
                        <form onSubmit={handleSubmit} className="mt-4 pt-4 px-8 flex flex-col gap-6">
                            <div className="flex items-center">
                                <label
                                    htmlFor="companyName"
                                    className="w-24 text-gray-700"
                                >
                                    Company Name
                                </label>
                                <input
                                    id="companyName"
                                    type="text"
                                    placeholder="company name"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="flex-1 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black transition-colors duration-500"
                                    required
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
                                    className="flex-1 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black transition-colors duration-500"
                                    required
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
                                    className={`${status === "" ? "text-gray-500" : "text-black"} flex-1 py-2 border-b-2 bg-transparent border-gray-300 focus:outline-none focus:border-black transition-colors duration-500`}
                                    required
                                >
                                    <option value="" disabled className="text-gray-700">select status</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Selected">Selected</option>
                                    <option value="Offered">Offered</option>
                                </select>
                            </div>
                            <button type="submit" className="mt-8 py-3 text-sm font-semibold tracking-widest uppercase text-white rounded-lg bg-gray-900 hover:bg-gray-700 transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:outline-none cursor-pointer">
                                Save
                            </button>
                        </form>
                        {error && <p>Error: {error}</p>}
                    </div>
                </motion.div>
        </>
    )
}