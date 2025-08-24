import { NavLink, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  PlusCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Sider } = Layout;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={200}
      style={{ height: "100vh", position: "fixed", left: 0, top: 0, bottom: 0 }}
    >
      <div className="logo">
        <Link
          to="/"
          className="block text-white text-center mt-4 text-xl md:text-2xl font-bold mb-4 hover:text-yellow-300 transition"
        >
          🎬 CinemaMax
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["users"]}
        items={[
          {
            key: "users",
            icon: <UserOutlined />,
            label: <NavLink to="/admin/users">Người dùng</NavLink>,
          },
          {
            key: "films",
            icon: <VideoCameraOutlined />,
            label: "Phim",
            children: [
              {
                key: "films-list",
                label: <NavLink to="/admin/films">Danh sách phim</NavLink>,
              },
              {
                key: "films-add",
                icon: <PlusCircleOutlined />,
                label: <NavLink to="/admin/films/add">Thêm phim</NavLink>,
              },
            ],
          },
          {
            key: "schedule",
            icon: <CalendarOutlined />,
            label: <NavLink to="/admin/schedule">Lịch chiếu</NavLink>,
          },
        ]}
      />
    </Sider>
  );
}
