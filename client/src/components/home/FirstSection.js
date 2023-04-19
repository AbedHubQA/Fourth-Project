import * as React from 'react'
import { Link } from 'react-router-dom'

const FirstSection = () => {
  return (
    <>
      <section className='home-sections first-home'>
        <h1>Hello World First Section!</h1>
        <div className='cta-buttons'>
          <Link to='/register'>
            <button className='sign-up-btn'>Sign Up</button>
          </Link>
          <Link to='/login'>
            <button className='login-btn'>Login</button>
          </Link>
        </div>
      </section>
    </>
  )
}

export default FirstSection