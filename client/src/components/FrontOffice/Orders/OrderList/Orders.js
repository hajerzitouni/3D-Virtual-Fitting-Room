import React from "react";
import Product from "../Product/Product";
import { useSelector } from "react-redux";
import { fa, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Orders = () => {
  const orders = useSelector(state => state.Orders.Orders);


  return (
    <>
      <h1>Orders list</h1>

      <div className="container justify-content-md-center">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop__cart__table">
              <table>
                <thead>
                  <tr>
                    <th>clientId</th>
                    <th>dateCreated</th>
                    <th>dateShipped</th>
                    <th>isValid</th>
                    <th>isShipped</th>
                    <th>totalPrice</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>

                {orders.map((order)=>(
          
                  <tr>
                      <td className="cart__price">{order.clientId} DT</td>
                      <td className="cart__price">{order.dateCreated} DT</td>
                      <td className="cart__price">{order.dateShipped} DT</td>
                      <td className="cart__price">{order.isValid} DT</td>
                      <td className="cart__price">{order.isShipped} DT</td>
                      <td className="cart__price">{order.totalPrice} DT</td>
                    {/* <td className="cart__product__item">
                      <img src={product.image} alt="" />
                      <div className="cart__product__item__title">
                        <h6>{product.productName}</h6>
                        <div className="rating">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                    </td>
                    <td className="cart__price">{product.price} DT</td>
                    <td className="cart__quantity">
                      <div className="pro-qty">
                        <span className="dec qtybtn">-</span>
                        <input type="text" value={product.Quantity}/>
                        <span className="inc qtybtn">+</span>
                      </div>
                    </td> */}
                    
                    <td className="cart__close">
                      <span className="icon_close"></span>
                    </td>
                  </tr>
                  ))}

                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;