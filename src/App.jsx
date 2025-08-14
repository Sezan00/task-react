import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegisterForm from './components/register'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SendOtpPage from './pages/SendOtpPage'
import VerifyOtpPage from './pages/VerifyOtpPage'
import Dashboard from './pages/Dashboard'
import CreateBlog from './blog/createBlog'


function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/login" element={<SendOtpPage/>} />
        <Route path='/verify' element={<VerifyOtpPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/createBlog" element={<CreateBlog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
