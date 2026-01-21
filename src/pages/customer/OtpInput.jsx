import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from '../../utils/Axios';
import SummaryApi from '../../common/SummaryApi';
import { useNavigate } from 'react-router-dom';

export const OtpInput = ({ length = 6, onOtpSubmit = () => { } }) => {
    const location = useLocation();
    const Number = location.state?.Number;
    const navigate = useNavigate();

    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }

        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) onOtpSubmit(combinedOtp);
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const onClick = async () => {

      const combinedOtp = otp.join(""); // Array ko string mein badla

        if (combinedOtp.length < length) {
            alert("Please enter full OTP");
            return;
        }

        try {
            const res = await Axios({
                url: SummaryApi.verifyCustomerOtp.url,
                method: SummaryApi.verifyCustomerOtp.method,
                data: {Number: Number, 
                    otp: combinedOtp }
            })
            if (res.data.success) {
                console.log("OTP verified successfully");
                navigate("/");
            } else {
                alert(res.data.message || "Invalid OTP");
            }
        }

        catch (err) {
            console.log("otp error", err)
        }

    }

    return (

        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card p-4 shadow-lg border-0" style={{ maxWidth: '450px', width: '100%' }}>

                <div className="mb-4">
                    <h2 className='fw-bold text-center mb-2'>OTP Verification</h2>
                    <p className='text-center text-muted'>
                        We have sent a verification code to <br />
                        <span className="fw-bold text-dark">+91 {Number}</span>
                    </p>
                </div>

                <div className='d-flex justify-content-center mb-4'>
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type='text'
                            value={value}
                            maxLength="1"
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className='form-control text-center mx-1 fw-bold shadow-sm'
                            style={{
                                height: "55px",
                                width: "48px",
                                fontSize: "22px",
                                border: "2px solid #ddd"
                            }}
                        />
                    ))}
                </div>

                <div className='text-center'>
                    <button
                        className='btn btn-success w-100 py-2 fs-5 shadow-sm'
                        onClick={onClick}>
                        Verify OTP
                    </button>
                    <p className="mt-3 text-muted small">
                        Didn't receive code? <span className="text-success fw-bold cursor-pointer" style={{ cursor: 'pointer' }}>Resend</span>
                    </p>
                </div>

            </div>
        </div>
    );
};