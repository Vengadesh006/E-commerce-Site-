import React, { useContext, useEffect, useState } from 'react'
import API from '../Api.js'
import { cardData } from '../../App.jsx'


export const MomenFa = ({ token , searchBar }) => {

  const { card, setCard } = useContext(cardData)
  const [isLoading, setIsloading] = useState(true)
  const [fetchData, setFetchData] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const serverData = async () => {
      try {
        const response = await API.get('women/')
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
     
       <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-3">
          {fetchData.filter((items) => searchBar.toLowerCase() === '' ? items : items.name.toLowerCase().includes(searchBar))
            .map((items) => (
              <div className="col" key={items.id} >
                <div className="card h-100">
                  <div className="card-body">
                    <img src={`http://localhost:8000/${items.image}`} style={{ height: '300px', objectFit: 'cover' }} className='card-img-top' alt="" />
                    <h6 className="card-title  "> {items.name} </h6>
                    <p className='card-text text-muted' > {items.desc} </p>
                    <p className='card-text fs-bold'>${items.price} </p>
                  </div>
                </div>

              </div>
            ))
          }
        </div>
    </>
  )


}
