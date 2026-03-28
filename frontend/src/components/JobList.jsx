import JobCard from "./JobCard";

export default function JobList({ jobs, onJobUpdated, onJobDeleted }) {
    return (
        <>
            <ul className="list-none p-8">
                <li className="w-full flex justify-evenly">
                    <span>Company Name</span>
                    <span>Job Title</span>
                    <span>Status</span>
                </li>
                {jobs.map((job) => (
                    <JobCard
                        key = {job.id}
                        job = {job}
                        onJobDeleted={onJobDeleted}
                        onJobUpdated={onJobUpdated}
                    />
                ))}
            </ul>
        </>
    )
}