import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

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

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Register Below!</h1>
        <input type='text' name='username' placeholder='Username' onChange={handleChange} value={formFields.username} />
        <input type='email' name='email' placeholder='Email' onChange={handleChange} value={formFields.email} />
        <input type='password' name='password' placeholder='Password' onChange={handleChange} value={formFields.password} />
        <input type='password' name='password_confirmation' placeholder='Password Confirmation' onChange={handleChange} value={formFields.password_confirmation} />
        <button>Register</button>
        {error && Object.keys(error).map(key => (
          <p key={key}>{key}: {error[key]}</p>
        ))}
      </form>
    </main>
  )
}

export default Register