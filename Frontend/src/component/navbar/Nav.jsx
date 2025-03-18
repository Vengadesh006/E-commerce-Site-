import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './nav.css'
import { Home } from '../home/Home'
import { Fashion } from '../fashion/Fashion'
import { Mobile } from '../mobile/Mobile'
import { Signup } from '../login/Signup'
import { Modal } from './Modal'
import { AddtoCard } from '../addcard/AddtoCard'
import { GetFashion } from '../fashion/GetFashion'
import { GetMobile } from '../mobile/GetMobile'
import API from '../Api'
import { WomenGet } from '../fashion/WomenGet'
import { PageNotFoud } from '../error/PageNotFoud'
import { OrderItems } from '../order/OrderItems'


export const Nav = () => {
    const token = localStorage.getItem('auth_token')

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (token) {
            const userNameFetch = async () => {
                try {
                    const response = await API.get('user/', {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    })

                    setUser(response.data)

                }
                catch (err) {
                    console.log('fetch the Api from user name' + err);

                }
            }
            userNameFetch()

        }

    }, [token])

    const logoutEvent = async () => {
        const postApi = API.post('logout/', {}, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(() => {
                alert('Logout Successfully')
                window.location.href = '/'
            }
            )
            .catch(err => alert('Login Faild ' + err))

    }


    return (
        <>
            <BrowserRouter>
                <nav>
                    <div className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                        <div className="container">
                            <Link className="navbar-brand" href="#"> {user ? `hai 👋 ${user}` : 'Welcome'}  </Link>
                            <button className='navbar-toggler' data-bs-target='#NAVBARNAV' data-bs-toggle='collapse' >
                                <span className='navbar-toggler-icon' ></span>
                            </button>
                            <div className="collapse navbar-collapse" id='NAVBARNAV' >
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <Link to='/' className="nav-link"> Home </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/fashion' className="nav-link"> Fashions </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/mobile' className="nav-link"> Mobile </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/addcard' className="nav-link"> Add Card </Link>
                                    </li>
                                    {user === null ?
                                        <li className="nav-item">
                                            <Link to='' className="nav-link" data-bs-target='#MODALFORM' data-bs-toggle='modal' > Login </Link>
                                        </li> :
                                        <li className="nav-item">
                                            <Link to='' onClick={logoutEvent} className="nav-link" data-bs-toggle='modal' > Logout </Link>
                                        </li>
                                    }
                                    <li className="nav-item">
                                        <Link to='/order' className="nav-link"> Order Items </Link>
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path='/' element={<Home token={token} />}  > </Route>
                    <Route path='/fashion' element={<Fashion token={token} />}  > </Route>
                    <Route path='/fashion/:id' element={<GetFashion token={token} />}  > </Route>
                    <Route path='/woman/:id' element={<WomenGet token={token} />}  > </Route>
                    <Route path='/mobile' element={<Mobile token={token} />}  > </Route>
                    <Route path='/mobile/:id' element={<GetMobile token={token} />}  > </Route>
                    <Route path='/addcard' element={<AddtoCard token={token} />}  > </Route>
                    <Route path='/order' element={<OrderItems token={token} />}> </Route>
                    <Route path='/signup' element={<Signup />}  > </Route>
                    <Route path='*' element={<PageNotFoud />} />

                </Routes>


                <Modal />
            </BrowserRouter>

        </>
    )
}
