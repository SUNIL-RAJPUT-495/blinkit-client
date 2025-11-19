import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { Searchpage } from "../pages/Searchpage";
import { Home } from "../pages/Home";
import { LoginPage } from "../pages/LoginPage";
import { OtpInput } from "../pages/OtpInput.jsx";
import { AdminPage } from "../pages/AdminPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <Searchpage /> },
      { path: "/login", element: <LoginPage />},
      
      
    ],
    
  },
  { path:"/login/OtpInput",element:<OtpInput/>},
  {path:"/AdminPage",element:<AdminPage/>}
]);

export default router;
