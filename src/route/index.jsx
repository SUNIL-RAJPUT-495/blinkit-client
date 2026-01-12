import { createBrowserRouter } from "react-router-dom";
import { CustomerLayout } from "../layout/CustomerLayout"
import { Searchpage } from "../pages/customer/Searchpage.jsx";
import { Home } from "../pages/customer/Home.jsx";
import { LoginPage } from "../pages/customer/LoginPage.jsx";
import { AdminLayout } from "../layout/AdminLayout.jsx";
import { AdminProfile } from "../pages/admin/Profile/AdminProfile.jsx";
import { SubCategory } from "../pages/admin/SubCategory/SubCategory.jsx";
import { UploadProductPage } from "../pages/admin/Products/UplodProductPage.jsx";
import { Category } from "../pages/admin/Categories/Category.jsx";
import { Products } from "../pages/admin/Products/Products.jsx";
import { AdminRegister } from "../pages/admin/Auth/AdminRegister.jsx"
import { OtpInput } from "../pages/customer/OtpInput.jsx"
import { Cart } from "../pages/customer/Cart.jsx";
import { AdminLogin } from "../pages/admin/Auth/AdminLogin.jsx";
import {PrivateRoute} from "../Component/admin/PrivateAdinRoute.jsx"
import { Logout } from "../pages/admin/Profile/LogOut.jsx";
import { AdminEmailVerification } from "../pages/admin/Auth/AdminEmailVerification.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "search", element: <Searchpage /> },
      { path: "cart", element: <Cart /> }
    ],

  },
  { path: "login", element: <LoginPage /> },
      { path: "login/OtpInput", element: <OtpInput /> },
      { path: "AdminLayout", element: <AdminLayout /> },
   {
    path: "/admin",
    children: [
      { path: "login", element: <AdminLogin /> },
      { path: "register", element: <AdminRegister /> },
      {path:"logout",element:<Logout/>},
      {path:"emailVerification",element:<AdminEmailVerification/>},

    
      {
        path: "",
        element: (
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <AdminProfile /> },
          { path: "profile", element: <AdminProfile /> },
          { path: "category", element: <Category /> },
          { path: "subcategory", element: <SubCategory /> },
          { path: "upload-product", element: <UploadProductPage /> },
          { path: "products", element: <Products /> },
        ],
      },
    ],
  },
]);


export default router;
