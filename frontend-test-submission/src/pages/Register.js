import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/users/register', form);
    alert('Registration successful');
  };

  return (
    <form onSubmit={handleRegister}>
      <input placeholder="Name" name="name" onChange={handleChange} />
      <input placeholder="Email" name="email" onChange={handleChange} />
      <input type="password" placeholder="Password" name="password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="student">Student</option>
        <option value="company">Company</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
