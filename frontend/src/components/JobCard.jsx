export default function JobCard({ job }) {
    console.log(job.companyName)

    return (
        <li className="text-xl border-2 rounded-xl border-solid border-black flex justify-between m-4 p-8">
            <span>{job.companyName}</span>
            <span>{job.jobTitle}</span>
            <span>{job.status}</span>
        </li>
    )
}