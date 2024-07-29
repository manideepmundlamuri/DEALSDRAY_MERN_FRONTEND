import React, { useEffect, useState } from 'react';
import { API_URL } from '../../data/apiPath';
import UpdateUser from '../updateUser/UpdateUser';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const loginToken = localStorage.getItem('loginToken');
        const response = await fetch(`${API_URL}/user/users`, {
          headers: {
            'token': loginToken
          }
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once on component mount

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleDeleteClick = async (userId) => {
    try {
      const loginToken = localStorage.getItem('loginToken');
      const response = await fetch(`${API_URL}/user/delete-user/${userId}`, {
        method: 'DELETE',
        headers: {
          'token': loginToken
        }
      });

      if (response.ok) {
        alert('User deleted successfully');
        confirm('Are you sure you want to delete the user !')
        setUsers(users.filter(user => user._id !== userId)); // Update the user list
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handleUpdateSuccess = async () => {
    console.log("User updated successfully - inside handleUpdateSuccess");
    setEditingUser(null);

    // Fetch updated users
    try {
      const loginToken = localStorage.getItem('loginToken');
      const response = await fetch(`${API_URL}/user/users`, {
        headers: {
          'token': loginToken
        }
      });

      const data = await response.json();
      console.log("Fetched user data:", data);

      if (response.ok) {
        setUsers(data.users); // Update the state with new user data
        console.log("Users state updated:", data.users);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  return (
    <>
      {users.length === 0 ? (
        <p>No user are added</p>
      ) : (

        <div>
          <h2>User List</h2>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <p> {user.image ? <img style={{height:'100px', width:'100px'}} src={`${API_URL}/uploads/${user.image}`} alt="User" /> : 'No Image'}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Mobile: {user.mobile}</p>
                <p>Designation: {user.designation}</p>
                <p>Gender: {user.gender}</p>
                <p>Course: {user.course.join(', ')}</p>

                <button style={{padding:'5px 20px', cursor:"pointer"}}  onClick={() => handleEditClick(user)}>Edit</button>
                <button style={{marginLeft:"20px",padding:'5px 20px' ,cursor:'pointer'}} onClick={() => handleDeleteClick(user._id)}>Delete</button>
              </li>
            ))}
          </ul>
          {editingUser && <UpdateUser user={editingUser} onUpdateSuccess={handleUpdateSuccess} />}
        </div>
      )}

    </>
  );
};

export default AllUsers;
