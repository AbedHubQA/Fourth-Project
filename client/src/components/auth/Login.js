import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../../UserContext'
import { userTokenFunction } from '../../helpers/auth'
import HeaderBanner from '../header/Header'
import LoginImage from '../../assets/images/login-img.png'

const Login = () => {

  const headerText = 'Login'

  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formFields)
      localStorage.setItem('Fourth-Project', data.token)
      const userProfile = await axios.get('/api/auth/profile/', userTokenFunction())
      setUser(userProfile.data)
      navigate('/challenges')
    } catch (error) {
      console.log('ERROR', error.response.data.detail)
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
        <div className='login-container'>
          <div className="login-img-container">
            <img className='login-img' src={LoginImage} alt="Testing" />
          </div>
          <div className='login-form-container'>

            <h1>Welcome back!</h1>
            <form onSubmit={handleLogin}>
              <input
                type='email'
                name='email'
                value={formFields.email}
                placeholder='Email'
                onChange={handleChange}
              />
              <br />
              <input
                type='password'
                name='password'
                value={formFields.password}
                placeholder='Password'
                onChange={handleChange}
              />
              <br />
              {error && <p>{error}</p>}
              <button type='submit'>Login</button>
            </form>
            <button onClick={handleBack}>Back</button>
          </div >
        </div>
      </main>
    </>
  )
}

export default Login
