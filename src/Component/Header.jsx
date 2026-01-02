import "../css/header.css";
import { Search } from "../Component/Search";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

export const Header = () => {
  const cartItems = useSelector((state) => state.cart.items || []);
  const navigate = useNavigate();
  const location = useLocation();

  // Total number of items (sum of quantities)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const openCart = () => {
    navigate("/cart", { state: { from: location.pathname } });
  };
   const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

  return (
    <header className="border-bottom sticky-top bg-white">
      <div
        className="d-flex justify-content-center align-items-center gap-4"
        style={{ height: "86px" }}
      >
        <Link to="/">
          <img src={logo} alt="logo" style={{ height: "40px" }} />
        </Link>

        <Search />

        <button onClick={() => alert("Login flow")} className="border-0 bg-white">
          Login
        </button>

        <span
          onClick={openCart}
          className="rounded fw-bold"
          style={{
            backgroundColor: totalItems > 0 ? "green" : "#eee",
            padding: "13px",
            cursor: "pointer",
            color: totalItems > 0 ? "white" : "black",
          }}
        >
         <span><MdOutlineShoppingCart style={{ fontSize: "28px" }} /></span> 
         <span> {totalItems > 0 ? ` My Cart ${totalItems} items` : " My Cart"}</span>
           <p>{totalPrice}</p>
        </span>
      </div>
    </header>
  );
};
