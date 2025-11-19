import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './Component/Header'
import { Outlet,useLocation} from "react-router-dom";
import { Footer } from './Component/Footer';
import { Home } from './pages/Home';
function App() {

  const location = useLocation();
  const hideHeader = location.pathname === "/Search" ;
  const hidefooter = location.pathname === "/Search" ;

  return (
    <>
    {!hideHeader && <Header/>}
      <Outlet /> 
    {!hidefooter && <Footer/>}
     <main></main>
    </>
  )
}

export default App