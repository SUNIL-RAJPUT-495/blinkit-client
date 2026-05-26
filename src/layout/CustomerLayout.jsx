import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../Component/Header';
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from '../Component/Footer';
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Cart } from "../pages/customer/Cart";

export const CustomerLayout = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/Search";
  const hideFooter = location.pathname === "/Search";

  // Cart state
  const [showCart, setShowCart] = useState(false);
  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  return (
    <div>
      {!hideHeader && <Header openCart={openCart} />}


      <div style={{ filter: showCart ? 'blur(0px)' : 'none', transition: 'filter 0.3s' }}>
        <Outlet context={{ openCart, closeCart, showCart }} />
      </div>

      {!hideFooter && <Footer />}
      <Toaster position="top-center" />

      {showCart && <Cart closeCart={closeCart} />}
    </div>
  );
};
