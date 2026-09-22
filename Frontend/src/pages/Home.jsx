import React from 'react'
import Sidebar from '../Components/Sidebar'
import MessageArea from '../Components/MessageArea'

function Home() {
  return (
    <div className='flex w-full h-screen'>
      <Sidebar />
      <MessageArea/>
    </div>
  )
}

export default Home