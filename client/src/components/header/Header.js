import React from 'react'
import HeaderImage from '../../assets/images/header.png'

// eslint-disable-next-line react/prop-types
function HeaderBanner({ headerText } ) {
  return (
    <>
      <div className='header-banner'>
        <img src={HeaderImage} alt="Header Image" className='header-img' />
        <div className="header-text">
          {headerText}
        </div>
      </div>
    </>
  )
}

export default HeaderBanner