import { useEffect, useState } from "react";
import { Timestamp, addDoc } from "firebase/firestore";
import Navbar from "../../Navbar";
import { useNavigate } from "react-router-dom";
import { incidentCollection } from "@renderer/components/lib/controller";

function CreateIncident() {

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

  const [inciData, setInciData] = useState({
    title: "",
    description: "",
    location: "",
    time: '',
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    setInciData({
      ...inciData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !inciData.title ||
      !inciData.description ||
      !inciData.location ||
      !inciData.time
    ) {
      setError("All fields are required");
      return;
    }
    await addDoc(incidentCollection, {
      ...inciData,
    })
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
      <h2 className="text-2xl font-semibold mb-6">Incident Report</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Incident Name:
        </label>
        <input
          type="text"
          id="title"
          value={inciData.title}
          onChange={handleChange}
          name="title"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter incident name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Incident Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={inciData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter incident description"
          rows={3}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Incident Location:
        </label>
        <input
          type="text"
          id="location"
          value={inciData.location}
          onChange={handleChange}
          name="location"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter incident location"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Incident Time:
        </label>
        <input
          type="date"
          id="time"
          value={inciData.time?inciData.time as string:''}
          onChange={handleChange}
          name="time"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter incident time"
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
