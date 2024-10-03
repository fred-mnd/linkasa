import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../Navbar"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { doc } from "firebase/firestore"
import { db } from "../lib/firebase"

function AirplaneDetail(){
  const airplane = useLocation().state.item

  const navigate = useNavigate()

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">{airplane.name}</h1>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-lg mb-2">Seats: {airplane.seats}</p>
          <div>
            <p className="text-lg mb-2">Crews:</p>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Working Years</th>
                </tr>
              </thead>
              <tbody>
                {airplane.crews.map((crew) => {
                  const [profile] = useDocumentDataOnce(doc(db, 'crews', crew));
                  return (
                    <tr key={crew} className="border-b">
                      <td className="py-2">{profile?.name}</td>
                      <td className="py-2">{profile?.working_years}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <button onClick={() => {
            navigate("/fom/manage-crews", {state: {airplane}})
          }}className="px-4 py-2 mt-6 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
            Manage Crew
          </button>
        </div>
      </div>
    </div>
  );
}

export default AirplaneDetail
