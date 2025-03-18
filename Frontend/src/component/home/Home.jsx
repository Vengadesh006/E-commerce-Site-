import React from 'react'
import './home.css'
import homeIcon from '../Assets/fashoin4.png'
import { Category } from './Category'

export const Home = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-left">
          <h2> NEW ARRIVALS ONLY 👋 </h2>
          <h2> COLLACTION </h2>
          <h2> NEW FOR EVERYONE </h2>
          <div className="hero-but">
            <button> more shop <span><i className="bi bi-arrow-right-circle-fill"></i></span></button>
          </div>
        </div>
        <div className="hand-hand-icon">
          <img src={homeIcon} alt="" />
        </div>
      </div>
      <h2 className='text-center' > SHOP CATEGORY </h2>
      <div className="container">
      <hr className='my-4' style={{borderBottom : '3px solid #000000'}} />
      </div>
      
      <Category />
    </>
  )
}
