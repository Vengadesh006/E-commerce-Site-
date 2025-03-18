import React, { useContext, useEffect, useState } from 'react'
import './fashion.css'
import API from '../Api.js'
import { MomenFa } from './MomenFa.jsx'
import { cardData } from '../../App.jsx'


export const Fashion = ({token}) => {

  const {card,setCard} = useContext(cardData)

  

  const [fetchData, setFetchData] = useState([])

  useEffect(() => {

    const serverData = async () => {
      try {
        const res = await API.get('product/')
        setFetchData(res.data)
        
      }
      catch (err) {
        console.log(err);
      }
    }
    serverData()

  },[])

  


  return (
    <>
      <div className="space" />
      <div className="container">
        <h2 className='text-center' > FASHION'S GATEGORY </h2>
        <hr style={{ borderBottom: '3px solid #000000' }} />
        <div className="row">
          {fetchData.map((item) => (
            <div className="col mb-3" key={item.id}>
              <div className="card fashion" style={{ width: '18rem' }} >
                <img src={`http://localhost:8000/${item.image}`} alt={item.image} className='card-top-image' />
                <div className="card-body">
                  <h5 className="card-title text-center"> {item.name} </h5>
                  <h6 className="card-title "> {item.desc} </h6>
                  <p className='' > ₹{item.price} <span style={{ textDecoration: 'line-through' }} > ₹300 </span> </p>
                  <div className="d-flex justify-content-around ">
                    <a href={`/fashion/${item.id}`} className='btn btn-primary w-100'> Shop Now </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr />
        <MomenFa />



      </div>

    </>
  )
}
