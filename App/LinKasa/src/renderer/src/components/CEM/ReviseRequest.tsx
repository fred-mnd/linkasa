import { useEffect, useState } from "react";
import { db, storage } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navbar from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import uuid from 'react-uuid'

function CreateRequest()
{

  const navigate = useNavigate()

  const originReport = useLocation().state.item
  console.log(originReport)

  const [budget, setBudget] = useState(originReport.proposal_budget)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !budget || budget <= 0 ||
      !proposal
    ) {
      setError("All fields are required");
      return;
    }
    const id = originReport.id
    const storageRef = ref(storage, 'files/proposals/' + id)
    await uploadBytes(storageRef, proposal)
    const url = await getDownloadURL(storageRef)

    const newReport = {
      ...originReport,
      project_budget: budget,
      project_proposal: url,
      status: "Waiting for reviewing"
    }
    await setDoc(doc(db, 'projects', id), newReport)
    alert("Data succesfully revised!")
    navigate("/home")
  }
  return (
    <div>
      <Navbar />
    <form
      className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-6">{originReport.project_name}</h2>
      <p className="mb-6">{originReport.project_description}</p>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Project Budget:
        </label>
        <input
          type="number"
          min={0}
          id="project_budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
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
