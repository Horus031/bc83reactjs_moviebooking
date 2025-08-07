import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminTemplate = () => {
  return (
    <div>
      Admin Template
      <Outlet/>
    </div>
  )
}

export default AdminTemplate
