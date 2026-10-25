import React9 from 'react'
import Sidebar from '../Components/Sidebar'
import MessageArea from '../Components/MessageArea'
import getMessage from '../currentHooks/getMessages'

function Home() {
  getMessage()
  return (
    <div className='flex w-full h-screen'>
      <Sidebar />
      <MessageArea/>
    </div>
  )
}

export default Home