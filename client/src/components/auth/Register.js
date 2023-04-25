import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import RegisterImage from '../../assets/images/register-img.png'
import HeaderBanner from '../header/Header'


const Register = () => {

  const headerText = 'Sign Up'

  const navigate = useNavigate()

  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formFields)
      navigate('/login')
    } catch (error) {
      setError(error.response.data.detail)
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <>
      <HeaderBanner headerText={headerText} />

      <main className='login-register'>
        <div className="login-container">
          <div className="login-img-container">
            <img className='register-img' src={RegisterImage} alt="Testing" />
          </div>
          <div className="login-form-container">
            <h1>Register below!</h1>
            <form onSubmit={handleSubmit}>
              <input className='login-email' type='text' name='username' placeholder='Username' onChange={handleChange} value={formFields.username} />
              <br />
              <input className='login-email' type='email' name='email' placeholder='Email' onChange={handleChange} value={formFields.email} />
              <br />
              <div className="password-confirmation">
                <input className='login-email' type='password' name='password' placeholder='Password' onChange={handleChange} value={formFields.password} />
                <input className='login-email' type='password' name='password_confirmation' placeholder='Repeat Password' onChange={handleChange} value={formFields.password_confirmation} />
              </div>
              <br />
              <div className="control-buttons">
                <button className='login-page-back' onClick={handleBack} type='button'>Back</button>
                <button className='login-page-btn'>Register</button>
              </div>
              {error && Object.keys(error).map(key => (
                <p key={key}>{key}: {error[key]}</p>
              ))}
            </form>
          </div>

        </div>
      </main>
    </>
  )
}

export default Register