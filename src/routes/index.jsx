import { Routes, Route } from "react-router-dom";
import AdminTemplate from "../pages/AdminTemplate";
import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
import MovieDetailsPage from "../pages/HomeTemplate/MovieDetailsPage";
import AuthPage from "../pages/HomeTemplate/AuthPage";
import MovieBookingPage from "../pages/HomeTemplate/MovieBookingPage";
import ProfilePage from "../pages/HomeTemplate/ProfilePage";

const routes = [
  {
    path: "/",
    element: HomeTemplate,
    nested: [
      {
        path: "",
        element: HomePage,
      },
      {
        path: "movie-details/:movieId",
        element: MovieDetailsPage,
      },
      {
        path: "movie-booking/:scheduleId",
        element: MovieBookingPage
      },
      {
        path: "/profile",
        element: ProfilePage
      },
      {
        path: "login",
        element: AuthPage
      },
      {
        path: "register",
        element: AuthPage
      }
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
  },
];

export const generateRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route path={route.path} element={<route.element />}>
          {route.nested.map((subroute) => {
            return (
              <Route path={subroute.path} element={<subroute.element />} />
            );
          })}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};
