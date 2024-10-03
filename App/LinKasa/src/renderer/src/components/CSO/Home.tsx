import { useState } from "react"
import ViewIncidents from "./Incidents/ViewIncidents"

function Home() {

  const [menu, setMenu] = useState(1)

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, Chief Security Officer</h1>
      <div className="flex gap-10">
        <div className="bg-blue-400 text-white h-fit w-1/4 p-4 rounded-lg">
        <ul className="flex flex-col gap-4">
          <li
            className={`p-2 ${
              menu === 1 ? "bg-blue-900" : "cursor-pointer"
            } rounded-md`}
            onClick={() => {if(menu != 1) setMenu(1)}}
            >
              View Incidents
          </li>
        </ul>
        </div>
        <div className="w-3/4">
          {menu === 1 && <ViewIncidents />}
        </div>
      </div>
    </div>
  )
}

export default Home

