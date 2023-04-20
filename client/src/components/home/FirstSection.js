import { Link } from 'react-router-dom'
import { authenticatedUser } from '../../helpers/auth'
import { useState, useEffect } from 'react'

const FirstSection = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(authenticatedUser())

  useEffect(() => {
    const handleUserLoggedOut = () => {
      setIsAuthenticated(false)
    }

    window.addEventListener('userLoggedOut', handleUserLoggedOut)

    return () => {
      window.removeEventListener('userLoggedOut', handleUserLoggedOut)
    }
  }, [])


  return (
    <>
      <section className='home-sections first-home'>
        <h1>Hello World First Section!</h1>
        {!isAuthenticated && (
          <div className='cta-buttons'>
            <Link to='/register'>
              <button className='sign-up-btn'>Sign Up</button>
            </Link>
            <Link to='/login'>
              <button className='login-btn'>Login</button>
            </Link>
          </div>
        )}
      </section>
    </>
  )
}

export default FirstSection