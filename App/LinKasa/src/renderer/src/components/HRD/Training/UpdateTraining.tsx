import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../../Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { trainingCollection } from "@renderer/components/lib/controller";

function CreateIncident() {

  const oldTrain = useLocation().state.train

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

  const [trainData, setTrainData] = useState({
    title: oldTrain.title,
    description: oldTrain.description,
    location: oldTrain.location,
    time: oldTrain.time
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    setTrainData({
      ...trainData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !trainData.title ||
      !trainData.description ||
      !trainData.location ||
      !trainData.time
    ) {
      setError("All fields are required");
      return;
    }
    await setDoc(doc(trainingCollection, oldTrain.id), trainData)
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
      <h2 className="text-2xl font-semibold mb-6">Training Detail</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Training Name:
        </label>
        <input
          type="text"
          id="title"
          value={trainData.title}
          onChange={handleChange}
          name="title"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter training name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Training Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={trainData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter training description"
          rows={3}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Training Location:
        </label>
        <input
          type="text"
          id="location"
          value={trainData.location}
          onChange={handleChange}
          name="location"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter training location"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Training Time:
        </label>
        <input
          type="datetime-local"
          id="time"
          value={trainData.time?trainData.time as string:''}
          onChange={handleChange}
          name="time"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter training time"
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
