import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../Component/Header'
import { Outlet,useLocation} from "react-router-dom";
import { Footer } from '../Component/Footer';
import  { Toaster } from "react-hot-toast";

export const CustomerLayout = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/Search" ;
  const hidefooter = location.pathname === "/Search" ;

  return (
    <div>

    {!hideHeader && <Header/>}
      <Outlet /> 
    {!hidefooter && <Footer/>}
    <Toaster position="top-center" />
  
    </div>
  )
}
