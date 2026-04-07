import { useEffect, useState } from "react";
import AddJobForm from "../components/AddJobForm";
import JobList from "../components/JobList";
import axiosInstance from "../api/axiosInstance";
import Header from "../components/Header";
import { AnimatePresence } from "framer-motion"

export default function Jobs({}) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        axiosInstance.get('/jobs').then(response => {
            setJobs(response.data)
            setLoading(false)
        }).catch(error => {
            setError(error)
            setLoading(false)
        })
    }, []);


    if(loading) return <p>Loading...</p>
    if (error !== "") return <p>Error: {error}</p>

    return (
        <>
            <div className="flex justify-center px-4">
                <div className="w-full max-w-6xl mt-4">
                    <Header/>
                    <div className="flex flex-col mt-4 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="font-medium">Jobs</span>
                            </div>
                            <button 
                                onClick={() => setIsFormOpen(true)}
                                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                            >
                                + New Job
                            </button>
                        </div>
                        <div className="mt-4 w-full">
                            <JobList
                                jobs={jobs}
                                onJobUpdated={(updatedJob) => setJobs(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j))}
                                onJobDeleted={(id) => setJobs(prev => prev.filter(j => j.id !== id))}
                            />
                        </div>
                    </div>
                    <AnimatePresence>
                        {isFormOpen &&
                            <AddJobForm
                                key="add-job-form"
                                onFormClose={() => setIsFormOpen(false)}
                                onJobAdded={(job) => setJobs(prev => [...prev, job])}
                            />
                        }
                    </AnimatePresence>
                </div>
            </div>
        </>
    )
}