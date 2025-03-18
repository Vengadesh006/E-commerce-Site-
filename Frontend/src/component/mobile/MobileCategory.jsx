import React, { useEffect, useState } from 'react'
import API from '../Api.js'
import { Link } from 'react-router-dom'

export default function MobileCategory({ token }) {
    const [fetchData, setFetchData] = useState([])

    useEffect(() => {
        const server = async () => {
            try {
                const res = await API.get('mobile/')
                setFetchData(res.data)
            }
            catch (err) {
                console.log(err);
            }
        }
        server()
    }, [])


    return (
        <>
            <div className="container">
                <h3 className="text-center mt-5">MOBILE CATEGORY'S</h3>
                <hr style={{ borderBottom: '3px solid #000000' }} />
                <div className="card my-5" style={{ maxWidth: '900px', border: 'none' }}>
                    <div className="row g-0 ">
                        {fetchData.map((item, index) => (
                            <div className="row g-0 mb-5 mobile-line" key={index}>
                                <div className="col-md-4">
                                    <img
                                        src={`http://localhost:8000/${item.image}`}
                                        className="img-fluid rounded-start"
                                        alt={item.name}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h4 className="card-title">{item.name}</h4>
                                        <h5 className="card-text">{item.desc}</h5>
                                        <p className="card-text">₹{item.price} <span style={{ textDecoration: 'line-through' }} > ₹300 </span> </p>
                                        <div className="d-flex">
                                            <Link to={`/mobile/${item.id}`} className="btn btn-primary mx-1 w-25">Shop Now</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

