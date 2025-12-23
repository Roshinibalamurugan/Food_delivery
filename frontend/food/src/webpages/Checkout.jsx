import React, { useState } from "react";
import Navbar from "../Navbar";
import "../styles/Checkout.css";
import axios from "axios"; 

const Checkout = ({ cartItems }) => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  const calculateTotal = () => {
    const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subTotal * 0.1;
    const deliveryFee = 25;
    return {
      subTotal,
      tax,
      deliveryFee,
      total: subTotal+tax+deliveryFee,
    };
  };

  const { subTotal, tax, deliveryFee, total } = calculateTotal();

  const handlePlaceOrder = async () => {
    if (paymentMethod === "creditCard" && (!cardNumber || !expirationDate || !cvv)) {
      setErrorMessage("Please fill out all credit card details.");
      return;
    }

    if (!deliveryAddress || !contactNumber) {
      setErrorMessage("Please fill out the delivery details.");
      return;
    }

    setErrorMessage("");  // Reset any prev err msg

    const orderData = {
      deliveryAddress,
      contactNumber,
      paymentMethod,
      cartItems,
      subTotal,
      tax,
      deliveryFee,
      total,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/orders", orderData);
      setOrderSuccess(true);
      setOrderDetails(response.data.order); 
    } catch (error) {
      console.error("Error placing order:", error);
      setErrorMessage("There was an error placing your order. Please try again.");
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-heading">Checkout</h1>

      <div className="order-summary">
        <h2>Order</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity} - ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <p>Subtotal: ${subTotal.toFixed(2)}</p>
        <p>Tax (10%): ${tax.toFixed(2)}</p>
        <p>Delivery Fee: ${deliveryFee.toFixed(2)}</p>
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      
      <div className="delivery-details">
        <h2>Delivery Details</h2>
        <textarea placeholder="Enter your delivery address" value={deliveryAddress}  onChange={(e) => setDeliveryAddress(e.target.value)} />
        <input type="tel" placeholder="Contact Number"  value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        <textarea placeholder="Delivery Instructions (Optional)" value={deliveryInstructions} onChange={(e) => setDeliveryInstructions(e.target.value)} />
      </div>

      
      <div className="payment-options">
        <h2>Payment Options</h2>
        <div>
          <label>Credit/Debit Card <input type="radio"value="creditCard" checked={paymentMethod === "creditCard"} onChange={(e) => setPaymentMethod(e.target.value)}/>
          </label>
          {paymentMethod === "creditCard" && (
            <div className="credit-card-details">
              <input type="text"  placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}/>
              <input type="text"  placeholder="MM/YY"  value={expirationDate}  onChange={(e) => setExpirationDate(e.target.value)}  />
              <input  type="text"  placeholder="4 digit pin"  value={cvv}  onChange={(e) => setCvv(e.target.value)}  />
            </div>
          )}

          <label>Cash on Delivery
            <input  type="radio"  value="cod"  checked={paymentMethod === "cod"}  onChange={(e) => setPaymentMethod(e.target.value)}  />
            
          </label>
        </div>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      
      <div className="delivery-time">
        <h2>Estimated Delivery Time</h2>
        <p>Approximately 30-40 minutes based on your location.</p>
      </div>

      <button className="place-order-button" onClick={handlePlaceOrder}> Place Order </button>

      {orderSuccess && (
        <div className="order-confirmation">
          <h2>Order Placed Successfully!</h2>
          <p><strong>Order Summary:</strong></p>
          <ul>
            {orderDetails.cartItems.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p>Delivery Address: {orderDetails.deliveryAddress}</p>
          <p>Contact Number: {orderDetails.contactNumber}</p>
          <p>Payment Method: {orderDetails.paymentMethod}</p>
          <p>Subtotal: ${orderDetails.subTotal.toFixed(2)}</p>
          <p>Tax (10%): ${orderDetails.tax.toFixed(2)}</p>
          <p>Delivery Fee: ${orderDetails.deliveryFee.toFixed(2)}</p>
          <h3>Total: ${orderDetails.total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Checkout;
