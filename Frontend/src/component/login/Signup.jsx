import React, { useState } from 'react';
import './signup.css';
import sign_icon from '../Assets/fashion1.jpg';
import API from '../Api';

export const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

    const formChangeData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password || !formData.email) {
            alert('All fields are required!');
            return;
        }

        if (formData.password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }

        try {
            await dataPost();
            setFormData({
                username: '',
                password: '',
                email: '',
            });
        } catch (error) {
            console.error('Signup failed:', error);
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
                                    required
                                />
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
                                    required
                                />
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
                                    required
                                />
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
