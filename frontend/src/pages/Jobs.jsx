import { useEffect, useState } from "react";
import AddJobForm from "../components/AddJobForm";
import JobList from "../components/JobList";
import axiosInstance from "../api/axiosInstance";
import Header from "../components/Header";

export default function Jobs({}) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
                <div className="w-full max-w-6xl mt-4 space-y-4">
                    <Header/>
                    <div className="flex flex-col p-4">
                        <div className="flex justify-between">
                            <div>
                                <span>Jobs</span>
                            </div>
                            <button>+ New Job</button>
                        </div>
                        <JobList
                            jobs={jobs}
                            onJobUpdated={(updatedJob) => setJobs(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j))}
                            onJobDeleted={(id) => setJobs(prev => prev.filter(j => j.id !== id))}
                        />
                    </div>
                    <AddJobForm
                        onJobAdded={(job) => setJobs(prev => [...prev, job])}
                    />
                </div>
            </div>
        </>
    )
}