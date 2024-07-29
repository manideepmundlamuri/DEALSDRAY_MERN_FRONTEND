import React, { useState } from 'react'
import './AdminLogin.css'
import { API_URL } from '../../../data/apiPath';
const AdminLogin = ({ showWellcomeshandle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json();
      if (response.ok) {
        alert('Login Successfully');
        setEmail('');
        setPassword('');
        localStorage.setItem('loginToken', data.token);
        window.location.reload()
        showWellcomeshandle()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <div className="admin-login">
        <div>
          <h2>Admin Login</h2><hr />
        </div>
        <div className='form-inputs'>
          <form action="" className='form-auth' onSubmit={handleLogin} >
            <label>Email</label><br />
            <input type="email" name='email' value={email} onChange={e => setEmail(e.target.value)} /><br />
            <label>Password</label><br />
            <input type="password" name='password' value={password} onChange={e => setPassword(e.target.value)} /> <div>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AdminLogin
