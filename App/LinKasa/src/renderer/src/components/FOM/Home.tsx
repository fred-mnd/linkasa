import { query } from "firebase/firestore"
import { airplaneCollection } from "../lib/controller"
import { useCollection } from "react-firebase-hooks/firestore"
import { useNavigate } from "react-router-dom"

function Home(){

  const navigate = useNavigate()

  const q = query(airplaneCollection)
  const [apSnap] = useCollection(q)

  const airplanes = apSnap?.docs.map(doc => (
    {
      id: doc.id,
      ...doc.data()
    }
  ))

  function printAirplaneDetail(item, status){
    return (
      <>
        <td className="py-2 px-4 border-b">{item.name}</td>
        <td className="py-2 px-4 border-b">{status}</td>
      </>
    )
  }

  function printAirplanes(item){
    if(item.crews.length == 5){
      return (
        <tr onClick={() => (
          navigate("/fom/airplane-detail", {state: {item}})
      )} key={item.id} className="hover:bg-red-200 bg-red-100 cursor-pointer">
          {printAirplaneDetail(item, "Fully Occupied")}
        </tr>
      )
    }
    else{
      return (
        <tr onClick={() => {
          navigate("/fom/airplane-detail", {state: {item}})
        }} key={item.id} className="hover:bg-gray-50 cursor-pointer">
          {printAirplaneDetail(item, "Available")}
        </tr>
      )
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, Flight Operations Manager</h1>
      <table className="min-w-fit bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Airplane Name</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {airplanes?.map((item) => (
            printAirplanes(item)
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home
