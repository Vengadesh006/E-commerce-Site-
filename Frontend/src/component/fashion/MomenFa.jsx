import React, { useEffect, useState } from 'react'
import API from '../Api'

export const MomenFa = () => {

    const [fetchData, setFetchData] = useState([])

    useEffect(() => {
        const serverData = async () => {
            try {
                const res = await API.get('women/')
                setFetchData(res.data)
            }
            catch (err) {
                console.log(err);
            }
        }
        serverData()
    }, [])

 

    return (
        <>
        <div className="momen-align">
        <h5 className='text-center my-5' > MOMEN'S CATEGORY </h5>
        <hr style={{ borderBottom: '3px solid #000000' }} />
        <div className="row">
        {fetchData.map((item) => (
            <div className="col mb-3" key={item.id}>
              <div className="card" style={{ width: '18rem' }} >
                <img src={`http://localhost:8000/${item.image}`} alt={item.image} className='card-top-image' />
                <div className="card-body">
                  <h5 className="card-title text-center"> {item.name} </h5>
                  <h6 className="card-title "> {item.desc} </h6>
                  <p className='' > ₹{item.price} <span style={{ textDecoration: 'line-through' }} > ₹300 </span> </p>
                  <div className="d-flex justify-content-around ">
                    <a href={`/woman/${item.id}`} className='btn btn-primary  w-100'  > Shop Now </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
          



        </>
    )
}
