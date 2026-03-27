import { useEffect, useState } from "react";
import AddJobForm from "../components/AddJobForm";
import JobList from "../components/JobList";
import axiosInstance from "../api/axiosInstance";

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
            <AddJobForm
                onJobAdded={(job) => setJobs(prev => [...prev, job])} 
            />
            <JobList 
                jobs={jobs} 
                onJobDeleted={(id) => setJobs(prev => prev.filter(j => j.id !== id))}
            />       
        </>
    )
}