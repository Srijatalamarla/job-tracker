import { useEffect, useState } from "react";
import AddJobForm from "../components/AddJobForm";
import JobList from "../components/JobList";
import axiosInstance from "../api/axiosInstance";
import Header from "../components/Header";
import { AnimatePresence } from "framer-motion"
import filterIcon from "../assets/filter.svg"
import Loading from "../components/Loading";

const statusStyles = {
    all: "bg-gray-100 text-gray-700",
    Applied: "bg-blue-100 text-blue-700",
    Interview: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
    Selected: "bg-green-100 text-green-700",
    Offered: "bg-purple-100 text-purple-700",
};

export default function Jobs({}) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all");
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

    useEffect(() => {
        axiosInstance.get('/jobs').then(response => {
            setJobs(response.data)
            setLoading(false)
        }).catch(error => {
            setError(error)
            setLoading(false)
        })
    }, []);

    const filteredJobs = (statusFilter === "all") ? jobs : (jobs.filter(job => job.status === statusFilter))


    if(loading) return <Loading/>
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
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <button
                                        onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                                    >
                                        <img src={filterIcon} alt="filter" className="h-10 hover:bg-gray-100 p-2 rounded-md transition duration-500 ease-in-out"/>
                                    </button>
                                    {isFilterMenuOpen &&
                                        <div className="absolute right-0 w-32 bg-gray-50 rounded-md shadow-lg transition">
                                            <ul>
                                                {Object.keys(statusStyles).map((stat) => (
                                                    <li className="bg-white px-2">
                                                        <div className="py-1 border-b border-solid border-gray-100">
                                                            <button 
                                                                className={`px-2 py-0.5 rounded-full text-sm font-medium ${statusStyles[stat]}`}
                                                                onClick={() => {
                                                                    setStatusFilter(stat)
                                                                    setIsFilterMenuOpen(false)
                                                                }}
                                                            >
                                                                {stat.charAt(0).toUpperCase() + stat.slice(1).toLowerCase()}
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    }
                                </div>
                                <button
                                    onClick={() => setIsFormOpen(true)}
                                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                                >
                                    + New Job
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 w-full">
                            {
                                (filteredJobs.length === 0) ?
                                    <p className="w-full font-bold text-xl my-4 text-center text-gray-500">No jobs yet. Add your first one above.</p> :
                                    <JobList
                                        jobs={filteredJobs}
                                        onJobUpdated={(updatedJob) => setJobs(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j))}
                                        onJobDeleted={(id) => setJobs(prev => prev.filter(j => j.id !== id))}
                                    />
                            }
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