import React, { useState } from 'react'
import { API_URL } from '../../../data/apiPath'
import './AddUser.css'

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState([]);
  const [file, setFile] = useState(null);

  const handleDesginationChange = (e) => {
    setDesignation(e.target.value)
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value)
  }

  const handleCourseChange = (e) => {
    const value = e.target.value;
    if (course.includes(value)) {
      setCourse.filter((item) => item !== value)
    } else {
      setCourse([...course, value])
    }
  }

  const handleImage = (e) => {
    const selectImage = e.target.files[0];
    setFile(selectImage);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error('user is not authenicated')
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('designation', designation);
      formData.append('gender', gender)
      course.forEach((value) => {
        formData.append('course', value);
      })
      formData.append('image', file)
      const response = await fetch(`${API_URL}/user/add-user`, {
        method: "POST",
        headers: {
          'token': `${loginToken}`
        },
        body: formData
      })
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert('USER ADDED SUCCESSFULLY');
        setName('');
        setEmail('');
        setMobile('');
        setDesignation('');
        setGender('')
        setCourse('');
        setFile('')
      }

    } catch (error) {
      console.error('filed to add user');
    }
  }

  return (
    <>
      <div className="add-user">
        <div className='form-inputs'>
          <div style={{ textAlign: 'center', marginBottom: "20px", fontSize: '30px', fontWeight: '600' }}>Add User</div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Name</label>
              <input type="text" name='name' value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input type="email" name='email' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="">Mobile No</label>
              <input type="number" name='mobile' value={mobile} onChange={e => setMobile(e.target.value)} />
            </div>
            <div className='designation'>
              <label>Designation:</label>
              <select value={designation} onChange={handleDesginationChange} >
                <option value="">Select designation</option>
                <option value="hr">HR</option>
                <option value="manager">Manager</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div className='gender'>
              <label>Gender:</label>
              <input
                type="radio"
                value="male"
                checked={gender === 'male'}
                onChange={handleGenderChange}
              />
              Male
              <input
                type="radio"
                value="female"
                checked={gender === 'female'}
                onChange={handleGenderChange}
              />
              Female
            </div><label>Course:</label>
            <div className='course'>
              <div>
                <label htmlFor="">
                  <input type="checkbox" checked={course.includes('mca')} value='mca' onChange={handleCourseChange} />
                  MCA
                </label>
              </div>
              <div>
                <label htmlFor="">
                  <input type="checkbox" checked={course.includes('bca')} value='bca' onChange={handleCourseChange} />
                  BCA
                </label>
              </div>
              <div>
                <label htmlFor="">
                  <input type="checkbox" checked={course.includes('bsc')} value='bsc' onChange={handleCourseChange} />
                  BSC
                </label>
              </div>
            </div>
            <div>
              <label>Image:</label>
              <input
                type="file"
                onChange={handleImage}
              />
            </div>
            <button type="submit">Add User</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddUser
