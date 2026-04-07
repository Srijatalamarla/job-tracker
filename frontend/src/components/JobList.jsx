import JobCard from "./JobCard";

export default function JobList({ jobs, onJobUpdated, onJobDeleted }) {
    return (
        <>
            <table className="w-full table-fixed">
                <thead>
                    <tr className="border-b border-gray-300 text-base text-gray-500 text-left">
                        <th>Company Name</th>
                        <th className="pl-2">Job Title</th>
                        <th className="pl-2">Status</th>
                        <th className="pl-2 w-24"></th>
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