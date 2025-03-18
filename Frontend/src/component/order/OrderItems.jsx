import React, { useEffect, useState } from 'react';
import API from '../Api';

export const OrderItems = ({ token }) => {
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    const server = async () => {
      try {
        const order = await API.get('order/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setFetchData(order.data);
      } catch (err) {
        console.error('Error fetching order data:', err);
      }
    };
    server();
  }, [token]);

  

  return (
    <>
      <div className="card-space" />
      <div className="container">
        <h4 className="text-center">ORDER ITEMS</h4>
        <hr style={{ borderBottom: '2px solid black' }} />
      </div>

      <div className="container">
        {fetchData.length > 0 ? (
          fetchData.map((item) => (
            <div className="card mb-3" key={item.id} style={{ maxWidth: '440' }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.product?.image ? `http://localhost:8000/${item.product.image}` : 'default-image.jpg'}
                    className="img-fluid rounded-start"
                    alt={item.product?.name || 'Product image'}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body addtocard">
                    <h5 className="card-title">Product Name: {item.product?.name}</h5>
                    <p className="card-text">Description: {item.product?.description}</p>
                    <p className="card-text">Price: ${item.product?.price.toFixed(2)}</p>
                    <p className="card-text">Quantity: {item.quantity}</p>
                    <p className="card-text">Total: ${item.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-center my-5">No items found in your order.</h5>
        )}
      </div>

      
    </>
  );
};
