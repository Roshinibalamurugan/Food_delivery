import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './webpages/Home';
import Menu from './webpages/Menu';
import Cart from './webpages/Cart';
import Checkout from './webpages/Checkout';
import AuthModal from './components/AuthModal';
import Navbar from './Navbar';

const App = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // You can add logic to verify token and set user
      // For now, we'll assume the user is logged in if token exists
      setUser({ name: 'User', email: 'user@example.com' }); // Placeholder
    }
  }, []);

  const addToCart = (dish) => {
    setCart((prevCart) => {
      const existingDish = prevCart.find(item => item.id === dish.id);
      if (existingDish) {
        return prevCart.map(item =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...dish, quantity: 1 }];
      }
    });
  };

  const handleAuth = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <div>
        <Navbar user={user} onLoginClick={() => setIsAuthModalOpen(true)} onLogout={handleLogout} />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuth={handleAuth}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cart} setCartItems={setCart} />} />
          <Route path="/checkout" element={<Checkout cartItems={cart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
