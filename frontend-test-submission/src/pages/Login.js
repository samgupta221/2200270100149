import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/users/login', form);
    localStorage.setItem('token', res.data.token);
    alert('Login successful');
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" name="email" onChange={handleChange} />
      <input type="password" placeholder="Password" name="password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
