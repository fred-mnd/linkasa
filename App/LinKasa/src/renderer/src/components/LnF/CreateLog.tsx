import { useEffect, useState } from "react";
import { db, storage } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid'

function CreateLog() {

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

  const [itemData, setItemData] = useState({
    item_name: "",
    item_description: "",
    item_location: "",
  })

  const [image, setImage] = useState(null)

  const [error, setError] = useState("")

  const handleImageChange = (e)=>{
    const file = e.target.files[0]
    setImage(file)
  }

  const handleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    })
    console.log(image)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !itemData.item_name ||
      !itemData.item_description ||
      !itemData.item_location ||
      !image
    ) {
      setError("All fields are required");
      return;
    }
    const id = uuid()
    const storageRef = ref(storage, 'images/lost_items/' + id)
    await uploadBytes(storageRef, image)
    const url = await getDownloadURL(storageRef)
    console.log(url)
    const newItemData = {
      ...itemData,
      item_image: url,
      status: 'Unclaimed'
    }
    await setDoc(doc(db, 'lost_items', id), newItemData)
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
      <h2 className="text-2xl font-semibold mb-6">Item Information</h2>
      <div className="mb-4">
        <label htmlFor="item_name" className="block text-gray-700 text-sm font-bold mb-2">
          Item Name:
        </label>
        <input
          type="text"
          id="item_name"
          value={itemData.item_name}
          onChange={handleChange}
          name="item_name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter item name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="item_description" className="block text-gray-700 text-sm font-bold mb-2">
          Item Description:
        </label>
        <textarea
          id="item_description"
          name="item_description"
          value={itemData.item_description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter item description"
          rows={3}
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="item_location" className="block text-gray-700 text-sm font-bold mb-2">
          Item Found Location:
        </label>
        <input
          type="text"
          id="item_location"
          value={itemData.item_location}
          onChange={handleChange}
          name="item_location"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter found location"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="item_image" className="block text-gray-700 text-sm font-bold mb-2">
          Item Image:
        </label>
        <input
          type="file"
          id="item_image"
          name="item_image"
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

export default CreateLog
