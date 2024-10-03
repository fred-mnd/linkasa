import Navbar from "./Navbar"
import { getUserData } from "./AccountController"
import LnFHome from "./LnF/Home"
import CEMHome from "./CEM/Home"
import CFOHome from "./CFO/Home"
import FOMHome from "./FOM/Home"
import HRDHome from "./HRD/Home"
import CSOHome from "./CSO/Home"

function Menu(){
  const userRole = getUserData()?.role
  if(userRole === "Lost and Found Staff"){
    return (
      <LnFHome />
    )
  }
  else if(userRole === "Civil Engineering Manager"){
    return (
      <CEMHome />
    )
  }
  else if(userRole === "Chief Financial Officer"){
    return (
      <CFOHome />
    )
  }
  else if(userRole === "Flight Operations Manager"){
    return (
      <FOMHome />
    )
  }
  else if(userRole === "Human Resources Director"){
    return (
      <HRDHome />
    )
  }
  else if(userRole === "Chief Security Officer"){
    return (
      <CSOHome />
    )
  }
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {getUserData()?.role}</h1>
    </div>

  )
}

function Home(){
  return (
    <div>
      <Navbar />
      {Menu()}
    </div>
  )
}

export default Home
