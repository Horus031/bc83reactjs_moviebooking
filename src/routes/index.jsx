import { Routes, Route } from "react-router-dom";
import AdminTemplate from "../pages/AdminTemplate";
import HomeTemplate from "../pages/HomeTemplate";

const routes = [
  {
    path: "/",
    element: HomeTemplate,
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
        return <Route key={route.path} path={route.path} element={<route.element/>} />
    }
  });
};
