import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flexGrow: 1,
          padding: "20px",
          backgroundColor: "#f5f5f5",
          marginLeft: 200,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
