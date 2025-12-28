import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link , useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import loginLogo from "../../assets/app_logo.svg"

export const LoginPage = () => {

  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");};
    const [Number,setNumber] =useState("");
    
    const [User,SetUser]=useState("");
   
  const handleClick = async(e)=>{
  e.preventDefault();
   const res= await fetch("http://localhost:8080/api/user/register",{
      method :"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({Number})
      
    })
    if(Number.length !== 10){
      console.log("enter correct numberr")
    }
    else{navigate("/login/OtpInput", { state: { Number } });}
    const data = await res.json();
    SetUser(data)
    
    console.log(data);
    
}
    
  return (
    <Modal
      show
      centered
      onHide={handleClose}
      keyboard={false}
      contentClassName="p-3"
    >
      <div className="position-absolute top-0 start-0 p-3">
        <Link to="/" className="text-dark fs-4">
          <MdKeyboardBackspace />
        </Link>
      </div>

      <Modal.Header className="border-0 justify-content-center mb-0 ">
        <Modal.Title>
          <img src={loginLogo} alt="app logo" height="60" />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-0">
        <div className="text-center">
          <p className="fw-bold fs-4 m-0">India's last minute app</p>
          <p>Log in or Sign up</p>
        </div>

        <form onSubmit={handleClick}>
          <div
            className="d-flex align-items-center mx-auto px-3"
            style={{
              height: "45px",
              borderRadius: "10px",
              width: "280px",
              border: "1px solid #ccc",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: "700" }}>+91</span>
            <input 
            onChange={(e)=>setNumber(e.target.value)}
              type="tel"
              maxLength="10"
              placeholder="Enter mobile number"
              className="w-100 border-0 bg-transparent ms-2"
              style={{
                outline: "none",
                fontSize: "13px",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn mt-3 mx-auto d-block text-white"
            style={{
              width: "280px",
              height: "45px",
              borderRadius: "10px",
              backgroundColor: "rgba(158, 157, 157, 1)",
              fontSize: "14px",
            }}
          >
            Continue
          </button>
        </form>
      </Modal.Body>

      <Modal.Footer className="border-0 justify-content-center">
        <p style={{ fontSize: "12px" }} className="text-center m-0">
          By continuing, you agree to our Terms of service & Privacy policy
        </p>
      </Modal.Footer>
    </Modal>
  );
};
