import { useEffect, useState } from "react"
import JobList from "./components/JobList"
import Login from "./pages/Login"
import Register from "./pages/Register"
import axios from "axios";
import AddJobForm from "./components/AddJobForm";

export default function App() {

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
      <div>
        <h1 className="text-2xl flex justify-center p-4">Job Tracker</h1>
      </div>
      <AddJobForm token={token} onJobAdded={(job) => setJobs(prev => [...prev, job])} />
     <JobList 
        jobs={jobs} 
        onJobDeleted={(id) => setJobs(prev => prev.filter(j => j.id !== id))}
        token={token}
      />
      {/* <Login/> */}
    </>
  )
}