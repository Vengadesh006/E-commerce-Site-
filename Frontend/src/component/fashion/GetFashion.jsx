import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../Api';
import { cardData } from '../../App';




export const GetFashion = ({ token, user }) => {


  const { card, setCard } = useContext(cardData)
  const [count, setCount] = useState(1)

  const { id } = useParams();
  const [fashionData, setFashionData] = useState([]);


  useEffect(() => {
    const serverData = async () => {
      try {
        const res = await API.get(`product/${id}/`);
        setFashionData(Array.isArray(res.data) ? res.data : [res.data])
      } catch (err) {
        console.error(err);
      }
    };

    serverData();
  }, [id]);

  const AddtoCardFun = async (item) => {

    const response = await API.post('addtocard/', {
      'content_type': 'product',
      'object_id': item.id,
      'quantity': count
    }, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then(res => alert('Add to Card Successfull'))
      .catch(err => setMessage("No items in the cart."))

  }

  const OrderItems = async (item) => {

    if (user !== null) {
      const response = await API.post('order/', {
        'content_type': 'product',
        'object_id': item.id,
        'quantity': count
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(res => alert('order comfirm Successfull'))
        .catch(err => setMessage("No items in the order."))

    }
    else{
      alert('going to Logging !')
    }

  }




  return (
    <>
      <div className="space"></div>
      <div className="row container d-flex justify-content-center">
        {fashionData.map((item) => (
          <div className="row g-0" key={item.id} >
            <div className="col product d-flex justify-content-center">
              <img src={`http://localhost:8000/${item.image}`} alt="" />
            </div>
            <div className="col">
              <h4 > {item.name} </h4>
              <h6> {item.desc} </h6>
              <h4> ${item.price} </h4>
              <div className="button-class my-3">
                <button className='btn btn-primary' onClick={() => setCount(1 <= count ? count => count + 1 : 1)} > + </button>
                <span> {count}</span>
                <button className='btn btn-primary mx-2' onClick={() => setCount(1 <= count ? count => count - 1 : 0)} > - </button>
              </div>

              <div className="d-flex">

                <button onClick={() => OrderItems(item)} className='btn btn-primary' > Buy Now </button>

                <button onClick={() => AddtoCardFun(item)} className='btn btn-danger mx-2' > Add to Card </button>
              </div>
            </div>

          </div>
        ))}
      </div>



    </>
  );
};
