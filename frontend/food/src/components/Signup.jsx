import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      localStorage.setItem('token', response.data.token);
      onSignup(response.data.user);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      <p>
        Already have an account? <button onClick={onSwitchToLogin} style={styles.link}>Login</button>
      </p>
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' },
  form: { display: 'flex', flexDirection: 'column' },
  input: { margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' },
  button: { padding: '10px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error: { color: 'red', margin: '10px 0' },
  link: { background: 'none', border: 'none', color: '#f39c12', cursor: 'pointer', textDecoration: 'underline' },
};

export default Signup;
