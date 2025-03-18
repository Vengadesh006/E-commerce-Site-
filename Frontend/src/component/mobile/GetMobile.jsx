import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../Api'
import { cardData } from '../../App'


export const GetMobile = ({token}) => {
    const {id} = useParams()
    const [fetchData,setFashionData] = useState([])
    const [count , setCount] = useState(1)
    const {card,setCard} = useContext(cardData)
    console.log("token : ",token);
    


    useEffect(() => {
        const serverData = async () => {
            try{
            const res = await API.get(`mobile/${id}/`,{
                headers : `Token ${token}`
            })
            setFashionData(Array.isArray(res.data) ? res.data : [res.data])
        }
        catch(err)  {
            console.log(err)
        } 
        }
        serverData()
     }, [id])

    const AddtoCardPost = async (item) => {
        try {
            const response = await API.post('addtocard/', {
                content_type : 'mobile', 
                object_id : item.id, 
                quantity : count,
            }, {
                headers : {
                    Authorization : `Token ${token}`
                }
            })
            setCard(response.data)
            alert(' add to Card ')
            
        }catch(err) {
            console.log(err)
        }


     }

     const orderList = async (item) => {
        try {
            const response = await API.post('order/', {
                content_type : 'mobile', 
                object_id : item.id, 
                quantity : count,
            }, {
                headers : {
                    Authorization : `Token ${token}`
                }
            })
            setCard(response.data)
            alert('order is comfirmed  ')
            
        }catch(err) {
            console.log(err)
        }


     }



  return (
    <>
    <div className="space"></div>
    <div className="row container d-flex justify-content-center">
        {fetchData.map((item) => (
            <div className="row"  key={item.id}>
                <div className="col mobile-img d-flex justify-content-center">
                        <img src={`http://localhost:8000/${item.image}`} alt={item.image} />
                </div>
                <div className="col-6">
                        <h2> {item.name} </h2>
                        <h2> {item.desc} </h2>
                        <h2> ${item.price} </h2>
                        <div className="button-class my-3">
                <button className='btn btn-primary' onClick={() => setCount(1 <= count ? count => count + 1 : 1)} > + </button>
                <span className='mx-2' > {count}</span>
                <button className='btn btn-primary' onClick={() => setCount(1 <= count ? count => count - 1 : 0)} > - </button>
              </div>
                        <div className="d-flex">
                        <button onClick={() => orderList(item)} className='btn btn-primary mx-1' > Buy Now </button>
                        <button onClick={() => AddtoCardPost(item)}  className='btn btn-danger mx-1' > Add to Card </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
    
    </>
  )
}
