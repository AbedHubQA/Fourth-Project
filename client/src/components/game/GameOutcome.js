import { useNavigate } from 'react-router-dom'
import GameContext from '../../GameContext'
import { useContext } from 'react'

const GameOutcome = () => {
  const { userPoints, userRank, completedChallenges, setShowModal } = useContext(GameContext)

  const navigate = useNavigate()

  const handleLeaderboardClick = () => {
    navigate('/leaderboard')
    setShowModal(false)
  }

  const handleTryAgainClick = () => {
    navigate('/challenges')
    setShowModal(false)
  }

  const handleHomeClick = () => {
    navigate('/')
    setShowModal(false)
  }


  return (
    <>
      <div className="modal-overlay"></div>
      <div className="game-results-modal">
        <div className="modal-content">
          <div className="modal-title">
            <h2>Game Ended!</h2>
          </div>
          <div className="modal-scores">
            <p>Final score: {userPoints}</p>
            <p>Rank: {userRank}</p>
            <p>Challenges completed: {completedChallenges}/8</p>
          </div>
          <div className="modal-buttons">
            <div className="modal-button-leaderboard">
              <button onClick={handleLeaderboardClick}>View Leaderboard</button>
            </div>
            <div className="modal-button-try-again">
              <button onClick={handleTryAgainClick}>Try Again</button>
            </div>
            <div className="modal-button-home">
              <button onClick={handleHomeClick}>Home</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GameOutcome