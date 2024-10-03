import { Auth } from 'firebase/auth'
import logo from '../../assets/Navbar/logo.png'
import { useNavigate } from 'react-router-dom'
import { getUserData, setUserData } from '../AccountController'
import { useEffect } from 'react'

interface NavbarLogged {
  auth: Auth
}

function NavbarLogged({auth}: NavbarLogged){
  const navigate = useNavigate()

  const handleShortcut = (e: KeyboardEvent) => {
    if(e.ctrlKey && e.key === 'l'){
      onLogout()
    }
    else if(e.ctrlKey && e.key === 'c'){
      navigate("/chat")
    }
  }

  useEffect(()=>{
    document.addEventListener('keydown', handleShortcut)
    return () => {
      document.removeEventListener('keydown', handleShortcut)
    }
  }, [])

  const onLogout = () => {
    auth.signOut()
    setUserData(undefined)
    navigate("/")
  }
  return (
    <nav className="bg-blue-400 flex items-center w-full relative">
      <div onClick={() =>{
          navigate("/home")
        }}className="flex items-center p-2 gap-2">
        <img  src={logo} alt="" className="w-12" />
        <h1 className="font-bold tracking-wide text-3xl text-white">LinKasa</h1>
      </div>
        <button
          onClick={() => {
            navigate("/chat")
          }}
          className="bg-white text-blue-400 px-4 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring focus:border-blue-300"
        >
          Chat
        </button>

      <div className="flex items-center ml-auto pr-4">
        <span className="text-white mr-2">Hello, {getUserData()?.name}</span>
        <button
          onClick={onLogout}
          className="bg-white text-blue-400 px-4 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring focus:border-blue-300"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default NavbarLogged
