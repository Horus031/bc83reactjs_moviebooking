import React from 'react'

const Header = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-semibold">Quản lý Admin</div>
      <div className="flex items-center space-x-4">
        <div className="text-gray-700">Chào Admin</div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">Đăng xuất</button>
      </div>
    </header>
  )
}

export default Header
