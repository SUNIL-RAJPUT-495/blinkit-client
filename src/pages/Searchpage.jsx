import React from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

export const Searchpage = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center  gap-5 h-100 py-3 border-bottom">
        {/* logo section */}
        <Link to="/" className="border-end h-100">
          <img
            src="/417997b1-51c7-4d8a-a356-cdce2720102a.svg"
            alt="Blinkit logo"
            width={"134px"}
            height={"27px"}
          />
        </Link>
        {/* search section */}
        <div>
          <div
            className="d-flex  p-2 align-items-center gap-2"
            style={{
              boxShadow:"0 2px 6px rgba(0, 0, 0, 0.1)",
              width: "1000px",
              height: "42px",
              color: "#6c757d",
              border: "1px solid rgba(230, 229, 229, 1) ",
              borderRadius: "10px",
              cursor: "text",
            }}
          >
            <div>
              <FiSearch
                style={{
                  fontSize: "19px",
                  color: "black",
                  verticalAlign: "middle",
                }}
              />
            </div>
            <input
              type="text"
              className="w-100 h-100 border-0 bg-transparent" style={{outline:"none",fontSize:"13px"}} placeholder="Search for atta dal and more"
            />
          </div>
        </div>
        <span
          className=" rounded text-white fw-bold "
          style={{
            backgroundColor: "rgb(238, 236, 236)",
            padding: "8px",
            fontSize: "14px",
          }}
        >
          <MdOutlineShoppingCart
            style={{ fontSize: "28px", marginRight: "5px" }}
          />
          My cart
        </span>
      </div>
    </>
  );
};
