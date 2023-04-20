import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {

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
    <div>
      <h1>Login</h1>
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
  );
};

export default Login
