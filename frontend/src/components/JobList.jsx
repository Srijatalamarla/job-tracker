import JobCard from "./JobCard";

export default function JobList({ jobs, onJobDeleted, token }) {
    return (
        <>
            <ul className="list-none p-8">
                {jobs.map((job) => (
                    <JobCard
                        key = {job.id}
                        job = {job}
                        onJobDeleted={onJobDeleted}
                        token={token}
                    />
                ))}
            </ul>
        </>
    )
}