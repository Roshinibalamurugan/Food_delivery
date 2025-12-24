let orders = [];

class Order {
  constructor(data) {
    this._id = Date.now().toString() + Math.random().toString(36).substr(2, 9); // Simple ID generation
    this.deliveryAddress = data.deliveryAddress;
    this.contactNumber = data.contactNumber;
    this.paymentMethod = data.paymentMethod;
    this.cartItems = data.cartItems || [];
    this.subTotal = data.subTotal;
    this.tax = data.tax;
    this.deliveryFee = data.deliveryFee;
    this.total = data.total;
    this.orderDate = data.orderDate || new Date();
    this.status = data.status || "Pending";
  }

  save() {
    orders.push(this);
    return Promise.resolve(this);
  }

  static find(query = {}) {
    let result = orders;
    if (query.userId) {
      result = orders.filter(order => order.userId === query.userId);
    }
    return Promise.resolve(result);
  }

  static findOne(query) {
    return Promise.resolve(orders.find(order => {
      for (let key in query) {
        if (order[key] !== query[key]) return false;
      }
      return true;
    }));
  }

  static findByIdAndUpdate(id, update) {
    const order = orders.find(o => o._id === id);
    if (order) {
      Object.assign(order, update);
      return Promise.resolve(order);
    }
    return Promise.resolve(null);
  }
}

export default Order;

