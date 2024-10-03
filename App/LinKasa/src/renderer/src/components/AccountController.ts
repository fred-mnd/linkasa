import { useNavigate } from "react-router-dom";
import { auth } from "./lib/firebase";

interface UserData {
  id: string;
  name: string;
  role: string;
}

let currUser: UserData | undefined

export const setUserData = (user: UserData | undefined): void => {
  currUser = user
}

export const getUserData = () =>{
  return currUser
}

export const onLogout = () => {
    const navigate = useNavigate()
    auth.signOut()
    setUserData(undefined)
    navigate("/")
  }

  export const roles = [
    'Customer Service Manager',
    'Information Desk Staff',
    'Lost and Found Staff',
    'Check-in Staff',
    'Gate Agent',
    'Airport Operations Manager',
    'Flight Operations Manager',
    'Ground Handling Manager',
    'Landside Operations Manager',
    'Maintenance Manager',
    'Customs and Border Control Officer',
    'Baggage Security Supervisor',
    'Cargo Manager',
    'Logistics Manager',
    'Fuel Manager',
    'Cargo Handler',
    'Civil Engineering Manager',
    'Chief Executive Officer',
    'Chief Financial Officer',
    'Chief Operations Officer',
    'Chief Security Officer',
    'Human Resources Director'
  ]
