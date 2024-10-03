import { interviewCollection } from "@renderer/components/lib/controller"
import { deleteDoc, doc, query } from "firebase/firestore"
import { useEffect } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { useNavigate } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

function ViewTraining(){

  const navigate = useNavigate()
  const [intersSnap] = useCollection(query(interviewCollection))

  const inters = intersSnap?.docs.map((doc) => (
    {
      id: doc.id,
      ...doc.data()
    }
  ))

  const handleShortcut = (e) => {
    if(e.ctrlKey && e.key === 'n'){
      navigate('/hrd/create-interview')
    }
  }

  const handleDelete = async (e) => {
    await deleteDoc(doc(interviewCollection, e.id))
    alert("Training succesfully deleted")
  }

  useEffect(() => {
    document.addEventListener('keydown', handleShortcut)

    return (
      document.removeEventListener('keydown', handleShortcut)
    )
  }, [])

  return (
    <div>
      <button onClick={() => navigate('/hrd/create-interview')} className="border border-blue-500 text-blue-500 px-4 py-2 mb-4 rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
        Create Interview Schedule
      </button>
      <table className="min-w-fit bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Applicant Name</th>
            <th className="py-2 px-4 border-b">Interviewer</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {inters?.map((inter) => (
            <tr key={inter.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="py-2 px-4 border-b">{inter.name}</td>
              <td className="py-2 px-4 border-b">{inter.interviewer}</td>
              <td className="py-2 px-4 border-b">{inter.location}</td>
              <td className="py-2 px-4 border-b">{inter.time}</td>
              <td className="py-2 px-4 border-b text-center cursor-pointer">
                <div onClick={() => handleDelete(inter)}>
                  <DeleteIcon fontSize="medium"/>
                </div>
                <div onClick={() => {
                  navigate("/hrd/update-interview", { state: {inter} })
                }}>
                  <CreateIcon fontSize="medium" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewTraining

