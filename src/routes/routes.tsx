import { RouteObject, useRoutes } from "react-router-dom";
import Detail from "../component/Detail";
import List from "../component/List";
import MainLayout from "../layouts/MainLayout";

const Router = () => {
   const routes: RouteObject[] = [
      {
         path: "",
         element: <MainLayout />,
         children: [
            {
               path: ``,
               element: <List />,
            },
            {
               path: `/detail`,
               element: <Detail />,
            },
         ],
      },
   ];
   return useRoutes(routes);
};

export default Router;
