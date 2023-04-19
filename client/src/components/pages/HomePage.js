import * as React from 'react'
import HeaderBanner from '../header/Header'
import FirstSection from '../home/FirstSection'
import SecondSection from '../home/SecondSection'
import ThirdSection from '../home/ThirdSection'

const HomePage = () => {

  const headerText = 'Computing Challenge'

  return (
    <>
      <HeaderBanner headerText={headerText} />
      <main className='home-main'>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </main>
    </>
  )
}

export default HomePage