import React, { useEffect, useState } from 'react'
import './addcard.css'
import API from '../Api.js'


export const AddtoCard = ({ token }) => {

  const [fetchData, setFetchData] = useState([])

  useEffect(() => {
    if (token) {
      API.get('addtocard/', {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(res => setFetchData(res.data))
        .catch(err => console.log(err))

    }

  }, [token])

  const amount = fetchData.reduce(
    (acc, item) => acc + item.total,
    0
  );
  return (
    <>
      <div className="card-space" />
      <div className="container">
        <h4 className='text-center' > Add to Card </h4>
        <hr style={{ borderBottom: '2px solid black' }} />


      </div>

      <div className="container">
        {fetchData.map((item) => (

          <div className="card mb-3" key={item.id} style={{ maxWidth: '440' }}>

            <div className="row g-0">
              <div className="col-md-4">
                <img src={`http://localhost:8000/${item.product.image}`} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8 ">
                <div className="card-body addtocard"  >
                  <h5 className="card-title"> product Name :  {item.product.name}</h5>
                  <p className="card-text"> product Description : {item.product.description} </p>
                  <p className="card-text"> product Price:  ${item.product.price} </p>
                  <p className="card-text"> product Quantity:  {item.quantity} </p>
                  <p className="card-text"> product Total : {item.total} </p>
                </div>
              </div>
            </div>
          </div>



        ))}
      </div>
      <div className="container total">
        <h4 className='my-5' > Total Amount :{amount}  </h4>
      </div>







    </>
  )
}
