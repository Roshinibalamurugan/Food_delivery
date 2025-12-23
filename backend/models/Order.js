import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  deliveryAddress: { type: String, required: true },
  contactNumber: { type: String, required: true },
  paymentMethod: { type: String, required: true }, 
  cartItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  subTotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  deliveryFee: { type: Number, required: true },
  total: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }, 
  status: { type: String, default: "Pending" }, 
});

const Order = mongoose.model("Order", orderSchema);
export default Order;

