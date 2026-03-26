import { useEffect, useState } from "react";
import AddJobForm from "../components/AddJobForm";
import JobList from "../components/JobList";
import axios from "axios";

export default function Jobs({}) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    
    const [token] = useState(() => localStorage.getItem('token'))

    useEffect(() => {
        axios.get('http://localhost:8080/jobs', {
        headers: { "Authorization": `Bearer ${token}` }
        }).then(response => {
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
            <AddJobForm token={token} onJobAdded={(job) => setJobs(prev => [...prev, job])} />
            <JobList 
                jobs={jobs} 
                onJobDeleted={(id) => setJobs(prev => prev.filter(j => j.id !== id))}
                token={token}
            />       
        </>
    )
}