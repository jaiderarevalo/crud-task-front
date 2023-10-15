import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Protected from "./Protected";
import { createElement } from "react";
import { routesDashboard } from "./app.routes";
const Router = () => {

  const router = createBrowserRouter(routesDashboard.map((route, index) => (
      {
          ...route,
          element: route.protected ? <Protected children={createElement(route.element)} /> : createElement(route.element),
          children: route?.children?.map(subRoute => ({
              ...subRoute,
              element: createElement(subRoute.element)
          }))
      }
  )));
  return <RouterProvider router={router} />
}

export default Router;
