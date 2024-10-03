import { usersCollection } from "@renderer/components/lib/controller"
import { orderBy, query } from "firebase/firestore"
import { useEffect } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { useNavigate } from "react-router-dom"

function ViewEmployee(){

  const navigate = useNavigate()
  const [usersSnap] = useCollection(query(usersCollection, orderBy('name')))

  const users = usersSnap?.docs.map((doc) => (
    {
      id: doc.id,
      ...doc.data()
    }
  ))

  const handleShortcut = (e) => {
    if(e.ctrlKey && e.key === 'n'){
      navigate('/hrd/create-account')
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleShortcut)

    return (
      document.removeEventListener('keydown', handleShortcut)
    )
  }, [])

  return (
    <div>
      <button onClick={() => navigate('/hrd/create-account')} className="border border-blue-500 text-blue-500 px-4 py-2 mb-4 rounded-md hover:bg-blue-500 hover:text-white transition duration-300">Create Account</button>
      <table className="min-w-fit bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewEmployee
