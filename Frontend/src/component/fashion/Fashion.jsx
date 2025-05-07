import React, { useContext, useEffect, useState } from 'react'
import './fashion.css'
import API from '../Api.js'
import { MomenFa } from './MomenFa.jsx'
import { cardData } from '../../App.jsx'


export const Fashion = ({ token }) => {

  const { card, setCard } = useContext(cardData)
  const [isLoading, setIsloading] = useState(true)
  const [fetchData, setFetchData] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const serverData = async () => {
      try {
        const response = await API.get('product/')
        setFetchData(response.data)
        setIsloading(false)
      }
      catch (err) {
        console.log(err);
      }
    }
    serverData()
  }, [])

  return (


    <>
      <div className="space"></div>
      <h5 className='text-center' > Product Gallry  </h5>
      <hr />
      <div className="container">
        <input type="text" className='form-control mb-4 shadow-sm p-2'
          onChange={(e) => setSearch(e.target.value)}
          placeholder='SEARCH PRODUCT ....'
        />
        {isLoading ?    (<div className='d-flex justify-content-center' >
        <div className="spinner-border" role="status">
          <span className="visually-hidden ">Loading...</span>
        </div>
        </div>) : 
      

       ( <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-3">
          {fetchData.filter((items) => search.toLowerCase() === '' ? items : items.name.toLowerCase().includes(search))
            .map((items) => (
              <div className="col" key={items.id} >
                <div className="card h-100">
                  <div className="card-body">
                    <img src={`http://localhost:8000/${items.image}`} style={{ height: '300px', objectFit: 'cover' }} className='card-img-top' alt="" />
                    <h6 className="card-title  "> {items.name} </h6>
                    <p className='card-text text-muted' > {items.desc} </p>
                    <p className='card-text fs-bold'>${items.price} </p>
                    <a href={`fashion/${items.id}`} className='btn btn-primary w-100' > Show Now </a>
                  </div>
                </div>

              </div>
            ))
          }
        </div>)
}
<MomenFa searchBar = {search}  />
      </div>
      
    




    </>
  )


}
