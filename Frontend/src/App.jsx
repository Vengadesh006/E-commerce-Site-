
import API from "../API"
import { Nav } from "./component/navbar/Nav"
import React, { createContext, useState } from 'react'

export const cardData = createContext(null)

function App() {

  const [card,setCard] = useState([])


  return (
    <>
    <cardData.Provider value={{card,setCard}}  >
      <Nav />
    </cardData.Provider>
     
    </>
  )
}

export default App
