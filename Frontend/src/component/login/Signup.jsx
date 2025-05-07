import React, { useState } from 'react';
import './signup.css';
import sign_icon from '../Assets/fashion1.jpg';
import API from '../Api';

export const Signup = () => {
    const [err , setErr] = useState({})

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

    const formChangeData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isValidation = () => {
        const newErr = {}
        const passwordPattern =  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
        const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!formData.username.trim()){
            newErr.username = "username is required"
        }
        if(!formData.password.trim()){
            newErr.password = "password is requied"
        }
        else if(!passwordPattern.test(formData.password)){
            newErr.password = "Password must be at least 8 character,include one uppercase, lowercase , number and speical character"
        }
        if(!formData.email.trim()){
            newErr.email = "email is requied"

        }
        else if(!EmailPattern.test(formData.email)){
            newErr.email = "invalid email formate"
        }
        return newErr
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        const ValidateErr = isValidation()
        setErr(ValidateErr)

        if(Object.keys(ValidateErr).length === 0){
            
            try {
                await dataPost()
                setFormData({
                    username: '',
                    password: '',
                    email: '',
                });

            } catch (error) {
                console.error('Signup failed:', error);
            }
        }

        
    };
    
    

    const dataPost = async () => {
        try {
            await API.post('signup/', formData);
            alert('Account was created successfully :)');
        } catch (err) {
            alert(`Signup failed: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <>
            <div className="space"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 sign-img">
                        <img src={sign_icon} alt="Sign-up illustration" />
                    </div>
                    <div className="col-md-6">
                        <form action="/submit" method="POST" onSubmit={formSubmit}>
                            <h5 className="text-center mb-4">Sign-up Create User Account</h5>
                            <div className="form-group mb-3">

                                <label className="form-label">User Name:</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="Enter your new username"
                                    onChange={formChangeData}
                                    value={formData.username}
                                    
                                />
                                {err.username && <small className='text-danger mx-2' > {err.username} </small> }
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter your new password"
                                    onChange={formChangeData}
                                    value={formData.password}
                                    
                                />
                                {err.password && <small className='text-danger mx-2' > {err.password} </small> }
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    onChange={formChangeData}
                                    value={formData.email}
                                    
                                />
                                 {err.email && <small className='text-danger mx-2' > {err.email} </small> }
                            </div>

                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-danger">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
