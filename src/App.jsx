
import './App.css'
import LandingPage from './Admindashboard/pages/LandingPage/LandingPage'
import { Route, Routes } from 'react-router-dom'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
      </Routes>
    </>
  )
}

export default App
