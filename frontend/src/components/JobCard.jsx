export default function JobCard({ job }) {
    console.log(job.companyName)

    return (
        <div>
            <span>{job.companyName}</span>
            <span>{job.jobTitle}</span>
            <span>{job.status}</span>
        </div>
    )
}