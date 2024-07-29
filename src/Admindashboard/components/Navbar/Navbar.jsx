import React from 'react'
import './Navbar.css'
const Navbar = ({ showLoginHandle, showRegisterHandle, showLogout, logoutHandler }) => {
  return (
    <>
      <nav className='navbar'>
        <div className='nav-logo'>
          <h1>ADMIN..</h1>
        </div>
        <div className='nav-center'>
          <h3>ADMIN DASHBOARD</h3>
        </div>
        <div className='nav-links'>
          {!showLogout ?
            <>
              <div onClick={showLoginHandle}>LOGIN IN</div>
              <div onClick={showRegisterHandle}>REGISETR</div>
            </>
            : <div onClick={logoutHandler} >LOGOUT </div>
          }
        
        </div>
      </nav>
    </>
  )
}

export default Navbar
