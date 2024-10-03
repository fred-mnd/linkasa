import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../../Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { interviewCollection } from "@renderer/components/lib/controller";

function CreateIncident() {

  const oldInter = useLocation().state.inter

  const handleShortcut = (e: KeyboardEvent) => {
    if(e.key === 'Escape'){
      navigate("/home")
    }
  }
  const navigate = useNavigate()
    useEffect(() =>{
      document.addEventListener('keydown', handleShortcut)
      return () => {
        document.removeEventListener('keydown', handleShortcut)
      }
    }, [])

  const [interData, setInterData] = useState({
    name: oldInter.name,
    interviewer: oldInter.interviewer,
    location: oldInter.location,
    time: oldInter.time,
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    setInterData({
      ...interData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !interData.name ||
      !interData.interviewer ||
      !interData.location ||
      !interData.time
    ) {
      setError("All fields are required");
      return;
    }
    await setDoc(doc(interviewCollection, oldInter.id), interData)
    alert("Data succesfully updated!")
    navigate("/home")
  }

return (
    <div>
      <Navbar />
    <form
      className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-6">Interview Detail</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Applicant Name:
        </label>
        <input
          type="text"
          id="name"
          value={interData.name}
          onChange={handleChange}
          name="name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter applicant name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Interviewer:
        </label>
        <input
          type="text"
          id="interviewer"
          value={interData.interviewer}
          onChange={handleChange}
          name="interviewer"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter interviewer"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Interview Location:
        </label>
        <input
          type="text"
          id="location"
          value={interData.location}
          onChange={handleChange}
          name="location"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter interview location"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Interview Date:
        </label>
        <input
          type="date"
          id="time"
          value={interData.time?interData.time as string:''}
          onChange={handleChange}
          name="time"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter interview date"
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

export default CreateIncident
