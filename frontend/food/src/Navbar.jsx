import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLoginClick, onLogout }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logo}>TastyBites</h1>
      </div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/menu" style={styles.link}>Menu</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/cart" style={styles.link}>Cart</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/checkout" style={styles.link}>Checkout</Link>
        </li>
      </ul>
      <div style={styles.authContainer}>
        {user ? (
          <div style={styles.userInfo}>
            <span>Welcome, {user.name}</span>
            <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
          </div>
        ) : (
          <button onClick={onLoginClick} style={styles.loginButton}>Login/Signup</button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 2px',
    backgroundColor: '#333',
    color: 'white',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
  },
  logoContainer: {
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  logo: {
    color: '#f39c12',
    margin: 0,
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    flexGrow: 1,
    justifyContent: 'center',
  },
  navItem: {
    margin: '0 15px',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  },
  linkHover: {
    color: '#f39c12',
  },
  authContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  loginButton: {
    backgroundColor: '#f39c12',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  }
};

export default Navbar;
