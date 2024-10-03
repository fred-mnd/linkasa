import { deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { lostCollection } from "../lib/controller";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../lib/firebase";
import CreateIcon from '@mui/icons-material/Create';
import HowToRegIcon from '@mui/icons-material/HowToReg';

type lost_items = {
  id: string,
  item_name: string,
  item_description: string,
  item_location: string,
  item_image: string,
  status: string
}



function Home() {

  const navigate = useNavigate()

  const handleShortcut = (e) => {
    if(e.ctrlKey && e.key === 'n'){
      navigate("/lnf/create-log")
    }
  }

  const handleDelete = async (e) => {
    const storageRef = ref(storage, 'images/lost_items/' + e.id)
    deleteObject(storageRef)
    await deleteDoc(doc(lostCollection, e.id))
    alert("Item succesfully deleted")
    setLnfData((prevData) => prevData.filter((prevItem) => prevItem.id !== e.id))
  }

  const [lnfData, setLnfData] = useState<lost_items[]>([])
  useEffect(() => {
    document.addEventListener('keydown', handleShortcut)
    const fetchdata = async() =>{
      const snapshot = await getDocs(lostCollection)
      const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as lost_items[]
        setLnfData(data)
    }
    fetchdata()
    return () => {
      document.removeEventListener("keydown", handleShortcut)
    }
  }, [lnfData])

  const changeStatus = (item) => {
    if(item.status === 'Unclaimed'){
      return (
        <div onClick={async () => {
          await setDoc(doc(db, 'lost_items', item.id), {
            ...item,
            status: 'Returned to owner'
          })
          setLnfData([])
        }}>
          <HowToRegIcon fontSize="medium" />
        </div>
      )
    }
    return null
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, Lost and Found Staff</h1>
      <button onClick={() => {
          navigate("/lnf/create-log")
        }
      } className="border border-blue-500 text-blue-500 px-4 py-2 mb-4 rounded-md hover:bg-blue-500 hover:text-white transition duration-300">Create Log</button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lnfData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{item.item_name}</td>
              <td className="py-2 px-4 border-b">{item.item_description}</td>
              <td className="py-2 px-4 border-b">{item.item_location}</td>
              <td className="py-2 px-4 border-b">{item.status}</td>
              <td className="py-2 px-4 border-b text-center">
                <img src={item.item_image} alt="" className="h-36 mx-auto" />
              </td>
              <td className="py-2 px-4 border-b text-center cursor-pointer">
                <div onClick={() => handleDelete(item)}>
                  <DeleteIcon fontSize="medium"/>
                </div>
                <div onClick={() => {
                  navigate("/lnf/update-log", { state: {item} })
                }}>
                  <CreateIcon fontSize="medium" />
                </div>
                {changeStatus(item)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home
