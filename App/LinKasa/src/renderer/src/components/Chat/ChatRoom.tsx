import { useCollectionData } from 'react-firebase-hooks/firestore'
import { messageCollection } from '../lib/controller'
import { Query, addDoc, and, limit, or, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import Navbar from '../Navbar'
import { useState } from 'react'
import { getUserData, roles } from '../AccountController'

function ChatRoom() {
  const [group, setGroup] = useState(1)

  const [targetDept, setTargetDept] = useState('')

  const userData = getUserData()

  console.log(group)
  console.log(targetDept)

  let chatQuery: Query

  if(group == 1){
    chatQuery = query(messageCollection, where('target', '==', 'global'), orderBy('created_at'), limit(20))
  }
  else if(group == 2){
    chatQuery = query(messageCollection, or(and(where('target', '==', userData?.role), where('role', '==', targetDept)),
    and(where('target', '==', targetDept), where('role', '==', userData?.role))), orderBy('created_at'), limit(20))
  }
  else{
    chatQuery = query(messageCollection, and(where('target', '==', userData?.role), where('role' , '==', userData?.role)), orderBy('created_at'), limit(20))
  }

  const [messages] = useCollectionData(chatQuery)

  const [message, setMessage] = useState("")

  const handleSendChat = async(e) => {
    e.preventDefault()
    setMessage(message.trim())
    if(message === '') return

    const target = group == 1? 'global': group == 2 ? targetDept : userData?.role

    await addDoc(messageCollection, {
      message: message,
      user: getUserData()?.name,
      created_at: serverTimestamp(),
      target: target,
      role: userData?.role
    })

    setMessage('')
  }

  function showButton(string, number){
    if(group == number){
      return (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {string}
        </button>
      )
    }
    return (
      <button onClick={() => setGroup(number)}
        className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
        {string}
      </button>
    )
  }

  function showMessages(){
    return (
      <div className='flex flex-col-reverse h-full'>
        <form onSubmit={handleSendChat} className="p-4 border-t border-gray-300 bg-white">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-10/12 p-2 border rounded-md mr-auto"
          />
          <button type="submit" className="w-2/12 bg-blue-500 text-white px-4 py-2 rounded-md">
            Send
          </button>
        </form>
        <div className="p-4 h-auto overflow-y-auto">
          {messages &&
            messages.map((msg) => (
              <div className="mb-2">
                <div className="bg-cyan-50 text-black p-3 w-auto rounded-lg shadow-md">
                  <span className="font-semibold">{msg.user}:</span> {msg.message}
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }

  function showDepartment(){
    if(group == 2){
      return (
      <div className="h-screen flex">
        <div className="min-w-1/5 h-fit bg-gray-200 p-4 border-r border-gray-300">
          <ul>
            {roles.map((role) => {
              if(role == userData?.role) return null
              if(role == targetDept)
              return (
                <li className='text-blue-700'>{role}</li>
              )
              return (
                <li onClick={() => setTargetDept(role)} className='cursor-pointer'>{role}</li>
              )
            })}
          </ul>
        </div>
        <div className="flex flex-col-reverse w-4/5">
          {showMessages()}
        </div>
      </div>
      )
    }
    return showMessages()
  }

  return (
    <div className='h-96'>
      <Navbar />
        <div className="flex gap-3 p-3">
          {showButton("Global", 1)}
          {showButton("Department", 2)}
          {showButton("Internal", 3)}
        </div>
      {showDepartment()}
    </div>
  )
}

export default ChatRoom
