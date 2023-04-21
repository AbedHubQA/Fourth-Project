import HeaderBanner from '../header/Header'
import ChallengeGrid from '../challenge/ChallengeGrid'
import ChallengesBanner from '../header/ChallengeBanner'

const headerText = 'The Challenges'

const ChallengesPage = () => {
  return (
    <>
      <HeaderBanner headerText={headerText} />
      <ChallengesBanner />
      <ChallengeGrid />
    </>
  )
}

export default ChallengesPage