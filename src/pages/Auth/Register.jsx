import axios from 'axios'
import React, { useState } from 'react'
import SummaryApi from '../../common/SummaryApi'
import { toast } from "react-hot-toast";

export const Register = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        Password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.Password !== data.confirmPassword) {
            toast.error("Password and confirm password must be same");
            return;
        }

        try {
            const response = await axios({
                method: SummaryApi.Register.method,
                url: SummaryApi.Register.url,
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.Password
                }
            });

            console.log('response', response);
            toast.success("Registered Successfully!");

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className='bg-light p-5 mx-auto '>
            <form onSubmit={handleSubmit} className="w-50 p-4 bg-white rounded mx-auto">
                <p>Welcome to Binkeyit</p>

                <div className="mb-3">
                    <label htmlFor='name' className="form-label">Name</label>
                    <input
                        type="text"
                        id='name'
                        name="name"
                        className="form-control"
                        placeholder="Enter your name"
                        value={data.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor='email'>Email</label>
                    <input
                        id='email'
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={data.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="Password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={data.Password}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        type="password"
                        id='confirmPassword'
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Enter your confirm password"
                        value={data.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <button className="btn btn-success w-100">Submit</button>
            </form>
        </div>
    );
};
