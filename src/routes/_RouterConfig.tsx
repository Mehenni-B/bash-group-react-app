import { createBrowserRouter } from "react-router-dom";
import {
  AuthPage,
  RootLayout,
  NotFound,
  ServicesPage,
  StoreOrderPage,
  StoreOrderSuccessPage,
  ContactPage,
  OrdersPage,
  OrderDetailsPage,
  HomePage,
} from "../views/_index";

const RouterConfig = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <AuthPage action={"login"} /> },
      { path: "register", element: <AuthPage action={"register"} /> },
      {
        path: "services",
        children: [{ index: true, element: <ServicesPage /> }],
      },
      {
        path: "order",
        children: [
          { path: ':id', element: <OrderDetailsPage /> },
          { path: "list", element: <OrdersPage /> },
          { path: "store", element: <StoreOrderPage /> },
          { path: "store/success", element: <StoreOrderSuccessPage /> },
        ],
      },
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);

export default RouterConfig;
