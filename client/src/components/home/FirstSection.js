import { Link } from 'react-router-dom'
import { authenticatedUser } from '../../helpers/auth'
import { useState, useEffect, useContext } from 'react'
import UserContext from '../../UserContext'
import HomeImage from '../../assets/images/home-img.png'

const FirstSection = () => {

  const { isAuthenticated } = useContext(UserContext)

  return (
    <>
      <section className='home-sections first-home'>
        <div className="home-text">
          <h1>Welcome to the <br></br> Computing Challenge!</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
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
        </div>
        <div className="home-img-container">
          <img className='home-img' src={HomeImage} alt="Homepage image" />
        </div>
      </section>
    </>
  )
}

export default FirstSection