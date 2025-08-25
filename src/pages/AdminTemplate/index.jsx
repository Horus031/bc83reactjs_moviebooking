import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/header";

const AdminTemplate = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Main content area */}
        <div className="p-6">
          {/* Render route con tại đây */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminTemplate;
