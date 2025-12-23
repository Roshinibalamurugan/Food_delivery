import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../Navbar";
import "../styles/Cart.css";

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  //increase or decrease 
  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subTotal * 0.1;
    const deliveryFee = 25;
    return {
      subTotal,
      tax,
      deliveryFee,
      total: subTotal + tax + deliveryFee,
    };
  };

  const { subTotal, tax, deliveryFee, total } = calculateTotal();


  const handleProceedToCheckout = () => { navigate("/checkout");};

  return (
    <div className="container">
      <h1>Your Cart</h1>
      <div className="cartContainer">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cartItem">
              <img src={item.img} alt={item.name} className="itemImage" />
              <div className="itemDetails">
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <div className="quantityControls">
                  <button className="quantityButton" onClick={() => handleQuantityChange(item.id, -1)} >-</button>
                  <span>{item.quantity}</span>
                  <button className="quantityButton" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
                <button className="removeButton" onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </div>
          ))):(
          <p>Your cart is empty!</p>
        )}

        {cartItems.length > 0 && (
          <div className="totalSummary">
            <p>Subtotal: ${subTotal.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Delivery Fee: ${deliveryFee}</p>
            <p>Total: ${total.toFixed(2)}</p>
            <button className="checkoutButton" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

