import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';

export  const OtpInput = ({length=4,onOtpSubmit=()=>{}}) => {

    const location  =useLocation();
    const Number = location.state?.Number;
    
    const [otp,setotp]=useState(new Array(length).fill(""));
    const handleChange=()=>{}
    const handleClick=()=>{}
    const handleKeyDown=()=>{}
  return (
    <>
    <div>
    <div><p className='fs-1 fw-bold text-center border-bottom'>OTP Verification</p></div>
    <div><p className='text-center'>We have a verification code to +91 {Number}</p></div>
    <div className='text-center'> {
        otp.map((value,index)=>(
                <input 
                key={index}
                type='text'
                maxLength="1"
                onChange={(e)=>handleChange(index,e)}
                onClick={()=>handleClick(index)}
                onKeyDown={(e)=>handleKeyDown(index,e)}
                className='text-center' style={{height:"50px",width:"50px", margin:"5px"}}/>

            )
        )}</div>
        </div>
    </>

  )
}
