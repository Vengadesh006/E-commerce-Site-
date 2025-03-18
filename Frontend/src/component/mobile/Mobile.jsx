import React from 'react'
import './mobile.css'
import mobile_image from '../Assets/fashion5.png'
import MobileCategory from './MobileCategory'

export const Mobile = ({token}) => {
  return (
    <>
      <div className="space" />
      <div className="container mobile-bar ">
        <div className="right-side">
          <h3> TOP-RATE PERFORMANCE  </h3>
          <h4> NEW COLLECTION MOBILE </h4>
          <h4> NEW 😍</h4>
          <div className="but-side">
            <button> more shop </button>
          </div>
        </div>
        <div className="left-side">
        <img src={mobile_image} alt="" />
        </div>
      </div>
      <MobileCategory token = {token} />

      
    </>
  )
}
