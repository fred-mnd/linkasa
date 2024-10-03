import { useState } from "react"
import ViewEmployee from "./RecruitEmployee/ViewEmployee"
import ViewJobVacancy from "./JobVacancy/ViewJobVacancy"
import ViewTraining from "./Training/ViewTraining"
import ViewInterview from "./Interview/ViewInterview"

function Home() {

  const [menu, setMenu] = useState(1)

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, Human Resources Director</h1>
      <div className="flex gap-10">
        <div className="bg-blue-400 text-white h-fit w-1/4 p-4 rounded-lg">
        <ul className="flex flex-col gap-4">
          <li
            className={`p-2 ${
              menu === 1 ? "bg-blue-900" : "cursor-pointer"
            } rounded-md`}
            onClick={() => {if(menu != 1) setMenu(1)}}
          >
            Employee
          </li>
          <li
            className={`p-2 ${
              menu === 2 ? "bg-blue-900" : "cursor-pointer"
            } rounded-md`}
            onClick={() => {if(menu != 2) setMenu(2)}}
          >
            Job Vacancy
          </li>
          <li
            className={`p-2 ${
              menu === 3 ? "bg-blue-900" : "cursor-pointer"
            } rounded-md`}
            onClick={() => {if(menu != 3) setMenu(3)}}
          >
            Training
          </li>
          <li
            className={`p-2 ${
              menu === 4 ? "bg-blue-900" : "cursor-pointer"
            } rounded-md`}
            onClick={() => {if(menu != 4) setMenu(4)}}
          >
            Interview
          </li>
        </ul>
        </div>
        <div className="w-3/4">
          {menu === 1 && <ViewEmployee />}
          {menu === 2 && <ViewJobVacancy />}
          {menu === 3 && <ViewTraining />}
          {menu === 4 && <ViewInterview />}
        </div>
      </div>
    </div>
  )
}

export default Home
