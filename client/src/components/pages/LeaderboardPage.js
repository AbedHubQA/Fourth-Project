import HeaderBanner from '../header/Header'
import ChallengesBanner from '../header/ChallengeBanner'
import Leaderboard from '../leaderboard/Leaderboard'

const LeaderboardPage = () => {

  const headerText = 'Leaderboard'

  return (
    <>
      <HeaderBanner headerText={headerText} />
      <ChallengesBanner />
      <main className='challenges-leaderboard'>
        <Leaderboard />
      </main>
    </>
  )
}

export default LeaderboardPage