import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../Navbar"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../lib/firebase"
import { useState } from "react"

function ProjectDetails(){

  const navigate = useNavigate()

  const [project, setProject] = useState(useLocation().state.item)
  console.log(project)

  const handleStartReview = async () => {
    const newProject = {
      ...project,
      status: "Being reviewed"
    }
    setProject(newProject)
    await setDoc(doc(db, 'projects', project.id), newProject)
  }

  const handleAccept = async () => {
    const newProject = {
      ...project,
      status: "Accepted"
    }
    setProject(newProject)
    await setDoc(doc(db, 'projects', project.id), newProject)
    alert("Project accepted!")
    navigate("/home")
  }

  const handleReject = async () => {
    const newProject = {
      ...project,
      status: "Rejected"
    }
    setProject(newProject)
    await setDoc(doc(db, 'projects', project.id), newProject)
    alert("Project rejected!")
    navigate("/home")
  }

  const handleRevise = async () => {
    const newProject = {
      ...project,
      status: "Needed revision"
    }
    setProject(newProject)
    await setDoc(doc(db, 'projects', project.id), newProject)
    navigate("/home")
  }

  function action() {
    if(project.status === "Waiting for reviewing"){
      return(
        <button onClick = {handleStartReview} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
          Start Review
        </button>
      )
    }
    else if(project.status === "Being reviewed"){
      return(
        <>
        <button onClick={handleReject} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
          Reject
        </button>
        <button onClick={handleRevise} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
          Revise
        </button>
        <button onClick={handleAccept} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
          Accept
        </button>
        </>
      )
    }
    return null
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">{project.project_name}</h1>
        <p className="text-gray-700">{project.project_description}</p>
        <p className="mt-2 text-sm text-gray-500">Budget: ${project.project_budget}</p>
        <button onClick={()=>{
          window.open(project.project_proposal)
        }} className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          See Proposal
        </button>
        <div className="mt-4 space-x-4">
          {action()}
        </div>
      </div>
    </>
  )
}
export default ProjectDetails
