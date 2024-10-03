import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../Navbar";
import { useLocation, useNavigate } from "react-router-dom";

function UploadLog() {
  const navigate = useNavigate()
    useEffect(() =>{
    if(!auth.currentUser){
      navigate("/");
    }
  }, [])
  if(!auth.currentUser){
    return null
  }
  const item = useLocation().state.item
  const [itemData, setItemData] = useState({
    item_name: item.item_name,
    item_description: item.item_description
  })

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !itemData.item_name ||
      !itemData.item_description
    ) {
      setError("All fields are required");
      return;
    }
    const newItemData = {
      ...itemData,
      item_location: item.item_location,
      item_image: item.item_image,
      status: item.status
    }
    await setDoc(doc(db, 'lost_items', item.id), newItemData)
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
      <img src={item.item_image} alt="" className="h-36 mx-auto py-2 px-4 border-b text-center" />
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

export default UploadLog
