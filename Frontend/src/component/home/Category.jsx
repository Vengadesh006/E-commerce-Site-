import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import API from '../Api'

export const Category = () => {

  const [homeData,setHomeData ] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await API.get('home/'); 
        setHomeData(res.data)
      }
      catch(err){
          console.log(err);  
      }
    }
    fetchData()
  },[])

  return (
    <>
      <div className="container">
        <div className="row">
          {homeData.map((item) => (
            <div className="col" key={item.id}>
              <div className="card card-home"   style={{width : '18rem'}} >
                <img src={`http://localhost:8000/${item.image}`} alt={item.image} className='card-top-image' />
                <div className="card-body">
                  <h5 className="card-title text-center "> {item.name} </h5> 
                  <p className='text-center' > ₹{item.price} <span style={{textDecoration : 'line-through' }} > ₹300 </span> </p>
                  <div className="d-flex justify-content-around">
                    <Link href="" className='btn btn-primary w-100' > Shop Now </Link>
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
