import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../../Navbar";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateJobVacancy() {
  const navigate = useNavigate()
    useEffect(() =>{
    if(!auth.currentUser){
      navigate("/");
    }
  }, [])
  if(!auth.currentUser){
    return null
  }
  const job = useLocation().state.job
  const [jobData, setJobData] = useState({
    title: job.title,
    description: job.description
  })

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !jobData.title ||
      !jobData.description
    ) {
      setError("All fields are required");
      return;
    }
    const newJobData = {
      ...jobData,
      image: job.image
    }
    await setDoc(doc(db, 'job_vacancies', job.id), newJobData)
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
      <img src={job.image} alt="" className="h-36 mx-auto py-2 px-4 border-b text-center" />
      <h2 className="text-2xl font-semibold mb-6">Job Vacancy Information</h2>
      <div className="mb-4">
        <label htmlFor="item_name" className="block text-gray-700 text-sm font-bold mb-2">
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
        <label htmlFor="item_description" className="block text-gray-700 text-sm font-bold mb-2">
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
  );
}

export default UpdateJobVacancy
