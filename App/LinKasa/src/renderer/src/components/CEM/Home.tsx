import { deleteDoc, doc, query } from "firebase/firestore";
import { projectCollection } from "../lib/controller";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../lib/firebase";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useCollection } from "react-firebase-hooks/firestore";
import CreateIcon from '@mui/icons-material/Create';

function Home() {

  const navigate = useNavigate()

  const handleShortcut = (e) => {
    if(e.ctrlKey && e.key === 'n'){
      navigate("/cem/create-request")
    }
  }

  const handleDelete = async (e) => {
    const storageRef = ref(storage, 'files/proposals/' + e.id)
    deleteObject(storageRef)
    await deleteDoc(doc(projectCollection, e.id))
    alert("Item succesfully deleted")
  }

  const snapshot = query(projectCollection)
  const [projectDataRaw] = useCollection(snapshot)
  const projectData = projectDataRaw?.docs.map((doc) => (
    {
      id: doc.id,
      ...doc.data()
    }
  ))
  useEffect(() => {
    document.addEventListener('keydown', handleShortcut)
    return () => {
      document.removeEventListener("keydown", handleShortcut)
    }
  }, [])

  function secondAction(item){
    if(item.status === 'Rejected' || item.status === 'Accepted'){
      return (
        <div onClick={() => handleDelete(item)} className="cursor-pointer">
          <DeleteIcon fontSize="medium"/>
        </div>
      )
    }
    else if(item.status === 'Needed revision'){
      return (
        <div>
          <div onClick={() => {
            navigate("/cem/revise-request", {state: {item}})
          }} className="cursor-pointer">
            <CreateIcon fontSize="medium"/>
          </div>
        </div>
      )
    }
    return null
  }

  function printRequestDetail(item){
    return (
      <>
        <td className="py-2 px-4 border-b">{item.project_name}</td>
        <td className="py-2 px-4 border-b">{item.project_description}</td>
        <td className="py-2 px-4 border-b">${item.project_budget}</td>
        <td className="py-2 px-4 border-b">{item.status}</td>
        <td className="py-2 px-4 border-b text-center flex flex-row justify-center gap-3">
          <div onClick={() => window.open(item.project_proposal)} className="cursor-pointer">
            <VisibilityIcon fontSize="medium"/>
          </div>
          {secondAction(item)}
        </td>
      </>
    )
  }

  function printRequests(item){
    if(item.status === 'Waiting for reviewing')
    return (
      <tr key={item.id} className="hover:bg-blue-200 bg-blue-100">
        {printRequestDetail(item)}
      </tr>
    )
    else if(item.status === 'Being reviewed')
    return (
      <tr key={item.id} className="hover:bg-yellow-200 bg-yellow-100">
        {printRequestDetail(item)}
      </tr>
    )
    else if(item.status === 'Accepted')
    return (
      <tr key={item.id} className="hover:bg-green-200 bg-green-100">
        {printRequestDetail(item)}
      </tr>
    )
    else if(item.status === 'Rejected')
    return (
      <tr key={item.id} className="hover:bg-red-200 bg-red-100">
        {printRequestDetail(item)}
      </tr>
    )
    else if(item.status === 'Needed revision')
    return (
      <tr key={item.id} className="hover:bg-gray-50">
        {printRequestDetail(item)}
      </tr>
    )
    return null
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, Civil Engineering Manager</h1>
      <button onClick={() => {
          navigate("/cem/create-request")
        }
      } className="border border-blue-500 text-blue-500 px-4 py-2 mb-4 rounded-md hover:bg-blue-500 hover:text-white transition duration-300">Create Request</button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Project Name</th>
            <th className="py-2 px-4 border-b">Project Description</th>
            <th className="py-2 px-4 border-b">Project Budget</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectData?.map((item) => (
            printRequests(item)
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home
