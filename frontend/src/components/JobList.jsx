import JobCard from "./JobCard";

export default function JobList({ jobs, onJobUpdated, onJobDeleted }) {
    return (
        <>
            <div className="w-full">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] table-fixed">
                        <thead>
                            <tr className="border-b border-gray-300 text-base text-gray-500 text-left">
                                <th>Company Name</th>
                                <th className="pl-2 max-w-56">Job Title</th>
                                <th className="pl-2 w-24 md:w-36 ">Status</th>
                                <th className="pl-2 w-16 md:w-24"></th>
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
                </div>
            </div>
        </>
    )
}