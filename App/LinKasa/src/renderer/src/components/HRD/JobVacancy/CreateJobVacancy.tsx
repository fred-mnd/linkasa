import { useEffect, useState } from "react";
import { db, storage } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navbar from "../../Navbar";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid'

function CreateJobVacancy() {

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

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
  })

  const [image, setImage] = useState(null)

  const [error, setError] = useState("")

  const handleImageChange = (e)=>{
    const file = e.target.files[0]
    setImage(file)
  }

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    })
    console.log(image)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !jobData.title ||
      !jobData.description ||
      !image
    ) {
      setError("All fields are required");
      return;
    }
    const id = uuid()
    const storageRef = ref(storage, 'images/job-vacancy/' + id)
    await uploadBytes(storageRef, image)
    const url = await getDownloadURL(storageRef)
    console.log(url)
    const newJobData = {
      ...jobData,
      image: url,
    }
    await setDoc(doc(db, 'job_vacancies', id), newJobData)
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
      <h2 className="text-2xl font-semibold mb-6">Job Vacancy</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Job Title:
        </label>
        <input
          type="text"
          id="title"
          value={jobData.title}
          onChange={handleChange}
          name="title"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter job title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Job Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={jobData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter job description"
          rows={3}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Poster:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          className="w-full py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleImageChange}
          accept="image/*"
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

export default CreateJobVacancy
