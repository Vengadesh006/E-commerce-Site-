import React, { useState } from 'react';
import API from '../Api';
import { useNavigate } from 'react-router-dom';

export const Modal = () => {

    const navigate = useNavigate()

    const [err,setErr] = useState({})

    const isValidation = () => {
        const newErr = {}
        if(!formData.username.trim()){
            newErr.username = "user name is required"
        }
        if(!formData.password.trim()){
            newErr.password = "password is required"
        }
        return newErr
    }

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleEvent = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    

    const FormSubmit = async (e) => {
        e.preventDefault();
        const val = isValidation()
        setErr(val)
     
       if(Object.keys(val).length === 0 ){
        try {
            const response = await API.post('login/', formData);
            console.log(formData);
            
            localStorage.setItem('auth_token', response.data.token);
            alert('Logged in Successfully');
            setFormData({
                username : '',
                password : ''
        })
        window.location.href = '/'
        
        }
         catch (err) {
            console.log("signup page",err)
        }

       }    
    };

    return (
        <>
            <div className="modal fade" id="MODALFORM">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">User Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={FormSubmit}>
                                
                                <div className="form-group my-2">
                                    <label htmlFor="username" className="form-label">Username:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter your username"
                                        onChange={handleEvent}
                                        value={formData.username}
                                    />
                                    {err.username && <small className='text-danger' > {err.username} </small>}
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        onChange={handleEvent}
                                        value={formData.password}
                                    />
                                    {err.password && <small className='text-danger' > {err.password} </small>}
                                </div>
                                <div className="d-flex justify-content-between login-page">
                                    <a href="signup">Create Account</a>
                                    <a href="">Forgot Password?</a>
                                </div>
                                <div className="d-flex justify-content-center mb-3">
                                    <button type="submit" className="btn btn-danger mt-3">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
