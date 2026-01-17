import "../css/header.css";
import { Search } from "../Component/Search";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";

export const Header = () => {
  const cartItems = useSelector((state) => state.cart.items || []);
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const openCart = () => {
    if(totalItems==0){
      return
    }
    navigate("/cart", { state: { from: location.pathname } });
  };
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <header className="border-bottom sticky-top bg-white">
      <div className="container">
        <div
          className="d-flex flex-wrap justify-content-between align-items-center gap-3"
          style={{ height: "86px" }}
        >
          <Link to="/">
            <img src={logo} alt="logo" style={{ height: "40px" }} />
          </Link>

          <div className="flex-grow-1 mx-3 d-none d-md-block">
            <Search />
          </div>

          <button
            onClick={() => navigate("login")}
            className="border-0 bg-white d-none d-md-block"
          >
            Login
          </button>

          <span
            onClick={openCart}
            className="rounded fw-bold d-flex align-items-center gap-2 d-none d-md-flex"
            style={{
              backgroundColor: totalItems > 0 ? "green" : "#eee",
              padding: "13px",
              cursor: "pointer",
              color: totalItems > 0 ? "white" : "black",
              whiteSpace: "nowrap",
            }}
          >
            <MdOutlineShoppingCart style={{ fontSize: "28px" }} />

            <span className="d-none d-md-inline">
              {totalItems > 0 ? (
                <>
                  {totalItems} items <br />
                  ₹{totalPrice.toFixed(2)}
                </>
              ) : (
                "My Cart"
              )}
            </span>
          </span>

        
        <span className="d-block d-md-none px-3" onClick={()=>{navigate("/login")}}>  <CgProfile size={40} /></span>
      </div>
      <div  className="d-block d-md-none px-3 w-100">
        <Search />
      </div>

    </div>
    </header >

  );
};
