import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/Navbar/logo.png'
import { auth } from '../lib/firebase'
import { setUserData } from '../AccountController'
import { useEffect } from 'react'

function Navbar(){

  const navigate = useNavigate()
  if(useLocation().pathname !== '/'){
    useEffect(()=> {
      auth.signOut()
      setUserData(undefined)
      navigate("/")
    }, [])
  }

  return (
    <nav className="bg-blue-400 flex items-center w-full fixed">
      <div className='flex items-center p-2 gap-2'>
        <img src={logo} alt="" className='w-12'/>
        <h1 className='font-bold tracking-wide text-3xl text-white'>LinKasa</h1>
      </div>
    </nav>
  )
}

export default Navbar
