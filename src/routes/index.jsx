import { Route } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import AdminTemplate from "../pages/AdminTemplate";
import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
import MovieDetailsPage from "../pages/HomeTemplate/MovieDetailsPage";
import AuthPage from "../pages/HomeTemplate/AuthPage";
import MovieBookingPage from "../pages/HomeTemplate/MovieBookingPage";
import ProfilePage from "../pages/HomeTemplate/ProfilePage";

import UserList from "../components/UserManagement/UserList";
import MovieList from "../components/MovieManagement/MovieList";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import AddMoviePage from "../pages/AdminTemplate/AddMoviePage";
import CreateShowtimePage from "../pages/AdminTemplate/CreateShowtimePage";

import AdminLayout from "../layouts/AdminLayout";

const routes = [
  {
    path: "/",
    element: <HomeTemplate />,
    nested: [
      { path: "", element: <HomePage /> },
      { path: "movie-details/:movieId", element: <MovieDetailsPage /> },
      { path: "movie-booking/:scheduleId", element: <MovieBookingPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "login", element: <AuthPage /> },
      { path: "register", element: <AuthPage /> },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedAdminRoute>
        <AdminTemplate />
      </ProtectedAdminRoute>
    ),
    nested: [
      { path: "users", element: <UserList /> },
      { path: "films", element: <MovieList /> },
      { path: "films/add", element: <AddMoviePage /> },
      { path: "schedule", element: <CreateShowtimePage /> },
      {
        path: "lich-chieu/tao-lich-chieu/:id", // tạo lịch cho từng phim
        element: (
          <ProtectedAdminRoute>
            <AdminLayout>
              <CreateShowtimePage />
            </AdminLayout>
          </ProtectedAdminRoute>
        ),
      },
    ],
  },
];

export const generateRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route path={route.path} element={route.element} key={route.path}>
          {route.nested.map((subroute) => (
            <Route
              key={subroute.path}
              path={subroute.path}
              element={subroute.element}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={route.element} />
      );
    }
  });
};
