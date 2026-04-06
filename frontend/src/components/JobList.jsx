import JobCard from "./JobCard";

export default function JobList({ jobs, onJobUpdated, onJobDeleted }) {
    return (
        <>
            <table className="w-full p-8">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Job Title</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                    <JobCard
                        key = {job.id}
                        job = {job}
                        onJobDeleted={onJobDeleted}
                        onJobUpdated={onJobUpdated}
                    />
                ))}
                </tbody>
            </table>
        </>
    )
}