import { FunctionComponent } from "react";
import LayoutPublic from "../layouts/Layout.public";
import LayoutPrivate from "../layouts/Layout.private";
import Login from "../pages/Login";
import Tasks from "../pages/Tasks";
import Home from "../pages/Home";
import Table from "../pages/Table";
import Register from "../pages/Register";

interface RouteBaseType {
  path: string;
  element: FunctionComponent<any>;
  exact?: boolean;
  protected?: boolean;
}

interface RouteType extends RouteBaseType {
  children?: RouteBaseType[];
}

export const routesDashboard: RouteType[] = [
  {
    path: "",
    element: LayoutPublic,
    children: [
      {
        path: "/",
        element: Home,
      },
      {
        path: "/login",
        element: Login,
      },
      {
        path: "/register",
        element: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: LayoutPrivate,
    protected: true,
    children: [
      {
        path: "create-task",
        element: Tasks,
        exact: true,
      },
      {
        path: "create-task/:id",
        element: Tasks,
        exact: true,
      },
      {
        path: "tasks",
        element: Table,
        exact: true,
      },
    ],
  },
];
