import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../../API';

export const WomenGet = ({ token }) => {
    const { id } = useParams();
    
    console.log(token);
    
    const [count, setCount] = useState(1);

    const [womenData, setWomenData] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get(`women/${id}/`)
                setWomenData(Array.isArray(response.data) ? response.data : [response.data])

            }
            catch(err){
                console.log(err);
                
            }

        }
        fetchData()
    },[])

    const addtocardFun = async (item) => {
        try {
            const res = API.post('addtocard/', {
                'content_type' : 'momen', 
                'object_id' : item.id,
                'quantity' : count

            }, {
                headers : {
                    Authorization : `Token ${token}`
                }
            })

            alert('add to card successfully')

        }
        catch(err) {
            setMessage("No items in the cart.");
            
        }

    }


   
    return (
        <>
            <div className="space"/>
            <div className="row container d-flex justify-content-center">
                {womenData.map((item) => (
                    <div className="row g-0" key={item.id}>
                        <div className="col product d-flex justify-content-center">
                            <img src={`http://localhost:8000/${item.image}`} alt="" />
                        </div>
                        <div className="col">
                            <h4>{item.name}</h4>
                            <h6>{item.desc}</h6>
                            <h4>${item.price}</h4>
                            <div className="button-class my-3">
                                <button
                                    className='btn btn-primary'
                                    onClick={() => setCount(count + 1)}
                                >
                                    +
                                </button>
                                <span className='mx-2' >{count}</span>
                                <button
                                    className='btn btn-primary mx-2'
                                    onClick={() => setCount(count > 1 ? count - 1 : 1)}
                                >
                                    -
                                </button>
                            </div>

                            <div className="d-flex">
                                <a href="#" className='btn btn-primary'>Buy Now</a>
                                <button onClick={() => addtocardFun(item)}  className='btn btn-danger mx-2'>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
