import { vacancyCollection } from "@renderer/components/lib/controller"
import { query } from "firebase/firestore"
import { useEffect } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { useNavigate } from "react-router-dom"

function ViewJobVacancy(){

  const navigate = useNavigate()
  const [jobSnap] = useCollection(query(vacancyCollection))

  const jobs = jobSnap?.docs.map((doc) => (
    {
      id: doc.id,
      ...doc.data()
    }
  ))

  const handleShortcut = (e) => {
    if(e.ctrlKey && e.key === 'n'){
      navigate('/hrd/create-job-vacancy')
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleShortcut)

    return (
      document.removeEventListener('keydown', handleShortcut)
    )
  }, [])

  return (
    <div>
      <button onClick={() => navigate('/hrd/create-job-vacancy')} className="border border-blue-500 text-blue-500 px-4 py-2 mb-4 rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
        Create Job Vacancy
      </button>
      <table className="min-w-fit bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Poster</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.map((job) => (
            <tr onClick={() => navigate("/hrd/job-vacancy-details", {state: {job}})} key={job.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="py-2 px-4 border-b">{job.title}</td>
              <td>
                <img className = "w-36"src={job.image} alt="" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewJobVacancy

