import JobCard from "./components/JobCard"

export default function App() {

  const jobs = [
    {
      "id" : "10",
      "companyName": "Atlassian",
      "jobTitle": "AI Engineer",
      "status": "Selected",
    },
    {
      "id" : "11",
      "companyName": "Google",
      "jobTitle": "Principal Engineer",
      "status": "Applied",
    },
    {
      "id" : "12",
      "companyName": "Coinbase",
      "jobTitle": "Software Engineer",
      "status": "Interview Done",
    },
  ]

  return (
    <>
      {jobs.map((job) => (
        <JobCard 
          key = {job.id}
          job = {job}
        />
      ))}
    </>
  )
}