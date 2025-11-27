import { createBrowserRouter } from "react-router-dom";
import {CustomerLayout} from "../layout/CustomerLayout"
import { Searchpage } from "../pages/customer/Searchpage.jsx";
import { Home } from "../pages/customer/Home.jsx";
import { LoginPage } from "../pages/Auth/LoginPage.jsx";
import { OtpInput } from "../pages/Auth/OtpInput.jsx";
import { AdminLayout } from "../layout/AdminLayout.jsx";
import {AdminProfile} from "../pages/admin/Profile/AdminProfile.jsx";
import {SubCategory} from "../pages/admin/SubCategory/SubCategory.jsx";
import {UplodProductPage} from "../pages/admin/Products/UplodProductPage.jsx";
import {Category} from "../pages/admin/Categories/Category.jsx";
import { Products } from "../pages/admin/Products/Products.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "search", element: <Searchpage /> },
      { path: "login", element: <LoginPage />},
      { path:"login/OtpInput",element:<OtpInput/>},
      {path:"AdminLayout",element:<AdminLayout/>}
    ],
    
  },
  {
    path:"/admin",
    element:<AdminLayout/>,
    children:[
      {path:"AdminProfile",element:<AdminProfile/>},
      { path: "category", element: <Category /> },
      { path: "subcategory", element: <SubCategory /> },
      { path: "upload-product", element: <UplodProductPage /> },
      {path:"products", element:<Products/>}
    ]
  }
  
]);

export default router;
