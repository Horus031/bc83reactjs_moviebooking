import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeTemplate = () => {
  return (
    <div>
      Home
      <Outlet/>
    </div>
  )
}

export default HomeTemplate
