import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import { useCollection } from "react-firebase-hooks/firestore";
import { doc, query, setDoc, where } from "firebase/firestore";
import { crewsCollection } from "../lib/controller";
import { useState } from "react";
import { db } from "../lib/firebase";



function ManageCrew() {
  const airplane = useLocation().state.airplane;
  const [crews, setCrews] = useState(airplane.crews)

  const [occupSnap] = useCollection(query(crewsCollection, where('__name__', 'in', crews)))
  const occupied = occupSnap?.docs.map((doc) => (
    {
      id: doc.id,
      ...doc.data()
    }
    ))

  const [availSnap] = useCollection(query(crewsCollection, where('__name__', 'not-in' , crews)))

  const avail = availSnap?.docs.map((doc) => (
    {
      id: doc.id,
      name: doc.data().name
    }
    ))

  const [selectedCrew, setSelectedCrew] = useState('')

  function addCrew(){
    if(i == 5) return null
    return (
      <tr key="newCrew" className="border-b">
        <td className="py-2 font-bold">New Crew</td>
        <td className="py-2">
          <select
            onChange={(e) => {
              setSelectedCrew(e.target.value)
            }}
            className=" w-fit block bg-white border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
            value={selectedCrew}
          >
            <option value="" disabled>Select a crew member</option>
            {avail?.map((option) => {
              return (
                <option value={option.id}>
                  {option.name}
                </option>
              )
            })}
          </select>
        </td>
        <td>
          <button onClick={async () => {
            airplane.crews.push(selectedCrew)
            setCrews((prevCrew) => [
              ...prevCrew, selectedCrew
            ])
            setSelectedCrew('')
          }} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
            Save
          </button>

        </td>
      </tr>
    )
  }
  let i = 0;

  async function saveCrew(){
    const newAirplane = {
      name: airplane.name,
      seats: airplane.seats,
      crews: airplane.crews
    }
    await setDoc(doc(db, 'airplanes', airplane.id), newAirplane)
    occupied?.map(async (crew) => {
      await setDoc(doc(db, 'crews', crew.id), {
        name: crew.name,
        working_years: crew.working_years,
        airplane: airplane.id
      })
    })
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-2xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">Manage Crew</h1>
          <div className="bg-white p-4 rounded shadow">
            <div>
              <table className="min-w-full">
                <tbody>
                  {occupied?.map((person) => {
                    i++
                    return (
                      <tr key={person.id} className="border-b">
                        <td className="py-2 font-bold">Crew {i}</td>
                        <td className="py-2">{person?.name}</td>
                      </tr>
                    )
                   })
                  }
                </tbody>
                {addCrew()}
              </table>
            </div>
            <button onClick={() => saveCrew()} className="px-4 py-2 mt-6 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCrew;
