import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../../Navbar";
import { useNavigate } from "react-router-dom";
import { roles } from "@renderer/components/AccountController";
import { createUserWithEmailAndPassword } from "firebase/auth";

function CreateAccount() {

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

  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: ""
  })

  const [error, setError] = useState("")


  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
    console.log(userData.role)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !userData.full_name ||
      !userData.email ||
      !userData.password ||
      !userData.role
    ) {
      setError("All fields are required");
      return
    }

    if(userData.password.length < 6){
      setError("Password must be at least 6 characters")
      return
    }
    let id
    await createUserWithEmailAndPassword(auth, userData.email + '@linkasa.com', userData.password).then((creds) => {
      id = creds.user.uid
    })
    .catch(() => {
      setError("Email already exists")
      return
    })
    console.log(id)
    const newUserData = {
      name: userData.full_name,
      role: userData.role
    }
    await setDoc(doc(db, 'users', id), newUserData)

    alert("Account succesfully created!")
    navigate("/home")
  }
  return (
    <div>
      <Navbar />
    <form
      className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-6">Create Account</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Full Name:
        </label>
        <input
          type="text"
          id="full_name"
          value={userData.full_name}
          onChange={handleChange}
          name="full_name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter full name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <div className="flex flex-row items-center gap-4">
          <input
            type="text"
            id="email"
            value={userData.email}
            onChange={handleChange}
            name="email"
            className="w-7/12 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter email"
          />
          @linkasa.com
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Initial Password:
        </label>
        <input
          type="password"
          id="password"
          value={userData.password}
          onChange={handleChange}
          name="password"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter initial password"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Role:
        </label>
        <select
          id="role"
          name="role"
          value={userData.role}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" disabled>Select a role</option>
          {roles.map((role) => {
            return (
              <option value={role}>{role}</option>
            )
          })}
        </select>
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
          Create
        </button>
      </div>
    </form>

    </div>
  )
}

export default CreateAccount
