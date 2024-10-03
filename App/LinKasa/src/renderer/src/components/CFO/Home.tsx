import { query } from "firebase/firestore"
import { projectCollection } from "../lib/controller"
import { useCollection } from "react-firebase-hooks/firestore"
import { useNavigate } from "react-router-dom"

function Home(){

  const navigate = useNavigate()

  const projectSnapshot = query(projectCollection)
  const [projects] = useCollection(projectSnapshot)
  const proj = projects?.docs.map((doc) => (
    {
      id: doc.id,
      ...doc.data()
    }
  ))

  function printRequestDetail(item){
    return (
      <>
        <td className="py-2 px-4 border-b">{item.project_name}</td>
        <td className="py-2 px-4 border-b">{item.project_budget}</td>
        <td className="py-2 px-4 border-b">{item.status}</td>
      </>
    )
  }

  function printRequests(item){
    if(item.status === 'Waiting for reviewing')
    return (
      <tr onClick={() => {
        navigate("/cfo/project-details", { state: {item} })
      }} key={item.id} className="hover:bg-blue-200 bg-blue-100 cursor-pointer">
        {printRequestDetail(item)}
      </tr>
    )
    else if(item.status === 'Being reviewed')
    return (
      <tr onClick={() => {
        navigate("/cfo/project-details", { state: {item} })
      }} key={item.id} className="hover:bg-yellow-200 bg-yellow-100 cursor-pointer">
        {printRequestDetail(item)}
      </tr>
    )
    else if(item.status === 'Accepted')
    return (
      <tr onClick={() => {
        navigate("/cfo/project-details", { state: {item} })
      }} key={item.id} className="hover:bg-green-200 bg-green-100 cursor-pointer">
        {printRequestDetail(item)}
      </tr>
    )
    else if(item.status === 'Rejected')
    return (
      <tr onClick={() => {
        navigate("/cfo/project-details", { state: {item} })
      }} key={item.id} className="hover:bg-red-200 bg-red-100 cursor-pointer">
        {printRequestDetail(item)}
      </tr>
    )
    else if(item.status === 'Needed revision')
    return (
      <tr onClick={() => {
        navigate("/cfo/project-details", { state: {item} })
      }} key={item.id} className="hover:bg-gray-50 cursor-pointer">
        {printRequestDetail(item)}
      </tr>
    )
    return null
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, Chief Financial Officer</h1>
      <table className="min-w-fit bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Project Name</th>
            <th className="py-2 px-4 border-b">Project Budget</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {proj?.map((item) => (
            printRequests(item)
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Home
