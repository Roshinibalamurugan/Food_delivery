let foods = [];

class Food {
  constructor(data) {
    this._id = Date.now().toString() + Math.random().toString(36).substr(2, 9); // Simple ID generation
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.imageUrl = data.imageUrl;
  }

  save() {
    foods.push(this);
    return Promise.resolve(this);
  }

  static find(query = {}) {
    return Promise.resolve(foods);
  }
}

export default Food;
