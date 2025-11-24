import { createBrowserRouter } from "react-router-dom";
import {CustomerLayout} from "../layout/CustomerLayout"
import { Searchpage } from "../pages/customer/Searchpage.jsx";
import { Home } from "../pages/customer/Home.jsx";
import { LoginPage } from "../pages/Auth/LoginPage.jsx";
import { OtpInput } from "../pages/Auth/OtpInput.jsx";
import { AdminLayout } from "../layout/AdminLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <Searchpage /> },
      { path: "/login", element: <LoginPage />},
      
      
    ],
    
  },
  { path:"/login/OtpInput",element:<OtpInput/>},
  {path:"/AdminLayout",element:<AdminLayout/>}
]);

export default router;
