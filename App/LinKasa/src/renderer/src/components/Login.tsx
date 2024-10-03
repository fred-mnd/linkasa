import { useState } from 'react';
import Navbar from './NavbarController/NavbarNotLogged';
import { auth, db } from './lib/firebase';
import { setUserData } from './AccountController'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, username, password).then(async() => {
      if (auth.currentUser) {
        const get = doc(db, "users", auth.currentUser.uid)
        const data = (await getDoc(get)).data()
        setUserData({
            id: auth.currentUser.uid,
            name: data?.name,
            role: data?.role,
          })
        navigate("/home")
      }
    }).catch(
      ()=> {
        setError("Invalid Credentials")
      }
    )
  };
  return (
    <>
    <Navbar />
    <div className='flex pl-52 h-screen'>
      <div className="max-w-md w-full my-auto p-6 bg-white rounded-md shadow-md relative">
        <h2 className="flex text-2xl font-bold mb-6 justify-center">LinKasa</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
            <div className="text-red-500 text-sm mb-4">
              <p>{error}</p>
            </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </>
  );
}

export default Login
