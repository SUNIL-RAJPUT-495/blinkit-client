import "../css/header.css";
import { Search } from "../Component/Search";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const Navigation = useNavigate();
  const reDirectiToLoginPage = () => {
    Navigation("/Login");
  };
  return (
    <header className="border-bottom sticky-top">
      <div
        className="d-flex justify-content-center align-items-center gap-4 bg-white"
        style={{ height: "86px" }}
      >
        {/* logo section */}
        <Link to="/" className=" h-100 d-flex justify-content-center align-items-center">
          <img
            src="/417997b1-51c7-4d8a-a356-cdce2720102a.svg"
            alt="Blinkit logo"
          />
        </Link>
        <div
          className="border-end me-4"
          style={{ height: "100%", width: "2px" }}
        ></div>
        <div className="d-flex flex-column align-items-center ">
          <p className="fw-bold" style={{ margin: "0", fontSize: "18px" }}>
            Delivery in 9 minutes
          </p>

          <p style={{ fontSize: "14px", marginTop: "0px", marginBottom: "0" }}>
            D,tara nagar jhotwara jaipur
          </p>
        </div>
        {/* search section */}
        <div>
          <Search />
        </div>
        <div>
          <button
            onClick={reDirectiToLoginPage}
            className="border-0 bg-white me-5"
          >
            Login
          </button>
          <span
            className=" rounded text-white fw-bold "
            style={{
              backgroundColor: "rgb(238, 236, 236)",
              padding: "13px",
              fontSize: "14px",
            }}
          >
            <MdOutlineShoppingCart
              style={{ fontSize: "28px", marginRight: "5px" }}
            />
            My cart
          </span>
        </div>
      </div>
    </header>
  );
};
