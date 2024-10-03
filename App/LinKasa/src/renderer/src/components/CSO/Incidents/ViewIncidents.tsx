import { incidentCollection } from "@renderer/components/lib/controller"
import { deleteDoc, doc, query } from "firebase/firestore"
import { useEffect } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { useNavigate } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

function ViewIncidents(){

  const navigate = useNavigate()
  const [incisSnap] = useCollection(query(incidentCollection))

  const incis = incisSnap?.docs.map((doc) => (
    {
      id: doc.id,
      ...doc.data()
    }
  ))

  const handleShortcut = (e) => {
    if(e.ctrlKey && e.key === 'n'){
      navigate('/cso/create-incident-report')
    }
  }

  const handleDelete = async (e) => {
    await deleteDoc(doc(incidentCollection, e.id))
    alert("Incident succesfully deleted")
  }

  useEffect(() => {
    document.addEventListener('keydown', handleShortcut)

    return (
      document.removeEventListener('keydown', handleShortcut)
    )
  }, [])

  return (
    <div>
      <button onClick={() => navigate('/cso/create-incident-report')} className="border border-blue-500 text-blue-500 px-4 py-2 mb-4 rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
        Create Incident Report
      </button>
      <table className="min-w-fit bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Incident</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {incis?.map((inci) => (
            <tr key={inci.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="py-2 px-4 border-b">{inci.title}</td>
              <td className="py-2 px-4 border-b">{inci.description}</td>
              <td className="py-2 px-4 border-b">{inci.location}</td>
              <td className="py-2 px-4 border-b">{inci.time}</td>
              <td className="py-2 px-4 border-b text-center cursor-pointer">
                <div onClick={() => handleDelete(inci)}>
                  <DeleteIcon fontSize="medium"/>
                </div>
                <div onClick={() => {
                  navigate("/cso/update-incident-report", { state: {inci} })
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

export default ViewIncidents

