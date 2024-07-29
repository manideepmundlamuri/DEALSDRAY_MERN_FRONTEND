import React, { useState } from 'react'
import './AdminRegister.css'
import axios from 'axios';
import { API_URL } from '../../../data/apiPath';
const AdminRegister = ({ showLoginHandle }) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/admin/register`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      })

      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        console.log(data);
        setEmail('')
        setUserName('')
        setPassword('')
        alert('Admin register successfully');
        showLoginHandle()
      }

    } catch (error) {
      console.log(error.message);
      alert('Registration failed');
      setLoading(false)
      setError('Registeration Failed');
    }
  }
  return (
    <>
      <div className="admin-register">
        <div>
          <h2>Admin Register</h2><hr />
        </div>
        <div className='form-inputs'>
          <form action="" className='form-auth' onSubmit={handleSubmit}>
            <label>UserName</label><br />
            <input type="text" name='username' value={username} onChange={e => setUserName(e.target.value)} /><br />
            <label>Email</label><br />
            <input type="email" name='email' value={email} onChange={e => setEmail(e.target.value)} /><br />
            <label>Password</label><br />
            <input type="password" name='password' value={password} onChange={e => setPassword(e.target.value)} /> <div>
              <button type='submit'>Submit</button>
            </div>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </>
  )
}

export default AdminRegister
