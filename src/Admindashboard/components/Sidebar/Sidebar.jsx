import React from 'react'
import './Sidebar.css'
const Sidebar = ({ showAddUserHandle, showAllUsershandle, showUpadteUsershandle }) => {
  return (
    <>
      <div className="sidebar-component">
        <ul>
          <li onClick={showAddUserHandle} >Add user</li>
          <li onClick={showAllUsershandle} >All users</li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
