import JobList from "./components/JobList"

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
      <div>
        <h1 className="text-2xl flex justify-center p-4">Job Tracker</h1>
      </div>
     <JobList jobs={jobs} />
    </>
  )
}