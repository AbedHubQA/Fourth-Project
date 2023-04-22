import { Link } from 'react-router-dom'
import { authenticatedUser } from '../../helpers/auth'
import { useState, useEffect, useContext } from 'react'
import UserContext from '../../UserContext'

const FirstSection = () => {

  const { isAuthenticated } = useContext(UserContext)

  return (
    <>
      <section className='home-sections first-home'>
        <h1>Hello World First Section!</h1>
        {!isAuthenticated() && (
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