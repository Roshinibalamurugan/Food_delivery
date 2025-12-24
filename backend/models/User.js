let users = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // Hashed password for 'password123'
    createdAt: new Date()
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // Hashed password for 'password123'
    createdAt: new Date()
  }
];

class User {
  constructor(data) {
    this._id = Date.now().toString() + Math.random().toString(36).substr(2, 9); // Simple ID generation
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.createdAt = data.createdAt || new Date();
  }

  save() {
    users.push(this);
    return Promise.resolve(this);
  }

  static findOne(query) {
    return Promise.resolve(users.find(user => {
      for (let key in query) {
        if (user[key] !== query[key]) return false;
      }
      return true;
    }));
  }

  static find(query = {}, projection = {}) {
    let result = users;
    if (query) {
      result = users.filter(user => {
        for (let key in query) {
          if (user[key] !== query[key]) return false;
        }
        return true;
      });
    }
    // Simple projection: exclude password if specified
    if (projection.password === 0) {
      result = result.map(user => {
        const { password, ...rest } = user;
        return rest;
      });
    }
    return Promise.resolve(result);
  }
}

export default User;
