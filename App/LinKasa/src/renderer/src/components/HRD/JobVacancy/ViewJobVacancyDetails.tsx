import Navbar from "@renderer/components/Navbar"
import { db, storage } from "@renderer/components/lib/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { useLocation, useNavigate } from "react-router-dom"

function ViewJobVacancyDetails(){
  const job = useLocation().state.job

  const navigate = useNavigate()

  const handleDelete = async (job) => {
    const storageRef = ref(storage, 'images/job-vacancy/' + job.id)
    deleteObject(storageRef)
    await deleteDoc(doc(db, 'job_vacancies', job.id))
    alert("Job vacancy succesfully deleted")
    navigate("/home")
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-2xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <div className="bg-white p-4 rounded shadow">
            <img className = "w-full"src={job.image} alt="" />
            <p className="text-lg my-5">{job.description}</p>
          </div>
          <div className="flex gap-5">
          <button onClick={() => handleDelete(job)}className="px-4 py-2 mt-6 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-green active:bg-red-800">
            Remove
          </button>
          <button onClick={() => {
            navigate("/hrd/update-job-vacancy", {state: {job}})
          }}className="px-4 py-2 mt-6 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
            Update
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewJobVacancyDetails
