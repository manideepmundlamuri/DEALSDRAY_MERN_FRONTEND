import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import AdminLogin from '../../components/forms/AdminLogin/AdminLogin'
import AllUsers from '../../components/AllUser/AllUsers'
import UpdateUser from '../../components/updateUser/UpdateUser'
import './LandingPage.css'
import AdminRegister from '../../components/forms/AdminRegister/AdminRegister'
import AddUser from '../../components/forms/AddUser/AddUser'
import Wellcome from '../../components/Wellcome'
const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showUpdateUsers, setShowUpdateUsers] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showWellcome, setShowWellcome] = useState(false);

  useEffect(() => {

    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      setShowLogout(true)
    }

  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('loginToken');
    setShowLogout(false);
  }

  const showLoginHandle = () => {
    setShowLogin(true)
    setShowRegister(false)
    setShowUser(false)
    setShowAllUsers(false)
    setShowUpdateUsers(false)
    setShowWellcome(false)
  }
  const showRegisterHandle = () => {
    setShowRegister(true)
    setShowLogin(false)
    setShowUser(false)
    setShowAllUsers(false)
    setShowUpdateUsers(false)
    setShowWellcome(false)


  }
  const showAddUserHandle = () => {
    setShowLogin(false)
    setShowRegister(false)
    setShowUser(true);
    setShowAllUsers(false)
    setShowUpdateUsers(false)
    setShowWellcome(false)


  }
  const showAllUsershandle = () => {
    setShowAllUsers(true);
    setShowLogin(false);
    setShowRegister(false);
    setShowUser(false);
    setShowUpdateUsers(false)
    setShowWellcome(false)


  }
  const showUpadteUsershandle = () => {
    setShowUpdateUsers(true);
    setShowAllUsers(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowUser(false);
    setShowWellcome(false)

  }
  const showWellcomeshandle = () => {
    setShowWellcome(true);
    setShowUpdateUsers(false);
    setShowAllUsers(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowUser(false);

  }
  return (
    <div>
      <Navbar showLoginHandle={showLoginHandle} showRegisterHandle={showRegisterHandle} showLogout={showLogout} logoutHandler={logoutHandler} />
      <div className="collection-section">
        <Sidebar showAddUserHandle={showAddUserHandle} showAllUsershandle={showAllUsershandle} showUpadteUsershandle={showUpadteUsershandle} />
        {showRegister && <AdminRegister showLoginHandle={showLoginHandle} />}
        {showWellcome && <Wellcome />}
        {showLogin && <AdminLogin showWellcomeshandle={showWellcomeshandle} />}
        {showUser && <AddUser />}
        {showAllUsers && <AllUsers />}
        {showUpdateUsers && <UpdateUser />}
      </div>
    </div>
  )
}

export default LandingPage
