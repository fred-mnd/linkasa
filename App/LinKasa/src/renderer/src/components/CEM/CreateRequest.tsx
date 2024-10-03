import { useEffect, useState } from "react";
import { db, storage } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid'

function CreateRequest()
{

  const navigate = useNavigate()

  const [report, setReport] = useState({
    project_name: '',
    project_description: '',
    project_budget: 0,
  })

  const [proposal, setProposal] = useState(null)

  const [error, setError] = useState('')

    const handleShortcut = (e: KeyboardEvent) => {
    if(e.key === 'Escape'){
      navigate("/home")
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleShortcut)
    return () => {
      document.removeEventListener('keydown', handleShortcut)
    }
  })

  const handleFileChange = (e)=>{
    const file = e.target.files[0]
    setProposal(file)
  }

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !report.project_name ||
      !report.project_description ||
      !report.project_budget || report.project_budget <= 0 ||
      !proposal
    ) {
      setError("All fields are required");
      return;
    }
    const id = uuid()
    const storageRef = ref(storage, 'files/proposals/' + id)
    await uploadBytes(storageRef, proposal)
    const url = await getDownloadURL(storageRef)

    const newReport = {
      ...report,
      project_proposal: url,
      status: "Waiting for reviewing"
    }
    await setDoc(doc(db, 'projects', id), newReport)
    alert("Data succesfully added!")
    navigate("/home")
  }
  return (
    <div>
      <Navbar />
    <form
      className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-6">Project Information</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Project Name:
        </label>
        <input
          type="text"
          id="project_name"
          value={report.project_name}
          onChange={handleChange}
          name="project_name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter project name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Project Description:
        </label>
        <textarea
          id="project_description"
          name="project_description"
          value={report.project_description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter project description"
          rows={3}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Project Budget:
        </label>
        <input
          type="number"
          min={0}
          id="project_budget"
          value={report.project_budget}
          onChange={handleChange}
          name="project_budget"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter project budget"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="item_image" className="block text-gray-700 text-sm font-bold mb-2">
          Proposal:
        </label>
        <input
          type="file"
          id="proposal"
          name="proposal"
          className="w-full py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm mb-4">
          <p>{error}</p>
        </div>
      )}
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </div>
    </form>

    </div>
  )
}

export default CreateRequest
