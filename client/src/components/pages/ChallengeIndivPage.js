import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userTokenFunction } from '../../helpers/auth'
import GameContext from '../../GameContext'
import GameBoard from '../game/GameBoard'
import ChallengeBanner from '../header/ChallengeBanner'

const difficulties = {
  bronze: 1,
  silver: 2,
  gold: 3,
  platinum: 4,
}

const themes = {
  sports: 1,
  media: 2,
}

const ChallengeIndivPage = () => {

  const { seed, game, setCurrentChallenge, userPoints, setUserPoints, sectionsStatus, setTotalCompleted, totalCompleted, countdown } = useContext(GameContext)

  const [error, setError] = useState('')
  const [challenge, setChallenge] = useState()
  const [challengeState, setChallengeState] = useState(new Set())
  const [userAnswer, setUserAnswer] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [totalScore, setTotalScore] = useState(1200)
  const [revealedSquares, setRevealedSquares] = useState(new Set())


  const gridSize = 25

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value)
  }

  const navigate = useNavigate()

  const backToChallenges = () => {
    navigate('/challenges')
  }

  useEffect(() => {
    if (countdown === 0) {
      navigate('/challenges')
    }
  }, [countdown])

  const handleSubmit = async () => {
    try {
      const userToken = userTokenFunction()
      const { data } = await axios.post(
        '/api/challenges/submit/',
        {
          game_id: game.id,
          challenge_id: challenge.id,
          user_answer: userAnswer,
          points_scored: totalScore,
        },
        userToken
      )

      if (data.is_correct) {
        console.log(totalCompleted + 1)
        // setTotalCompleted(totalCompleted + 1)
        setSuccessMessage('Congratulations! Your answer is correct.')
        setUserPoints(userPoints + data.points_scored)
        backToChallenges()
      } else {
        setError('Incorrect answer. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting challenge', error)
      setError('An error occurred while submitting the challenge. Please try again.')
    }
  }

  const { difficulty, theme } = useParams()

  useEffect(() => {
    if (!difficulties[difficulty] || !themes[theme]) {
      setError('Invalid difficulty/theme')
    }

    // if (!game) {
    //   setError('Game not started')
    // }
  }, [])

  const getUserChallenge = async (userChallengeId) => {
    try {
      const userToken = userTokenFunction()
      const { data } = await axios.get(
        `/api/user_challenges/${userChallengeId}/`,
        userToken
      )
      setRevealedSquares(
        data.revealed_squares
          ? new Set(data.revealed_squares.split(',').map(Number))
          : new Set()
      )
      setTotalScore(data.total_available_points)
    } catch (error) {
      setError(error.response.data.detail)
    }
  }

  const getChallenge = async () => {
    if (!game) {
      return
    }
    try {
      const userToken = userTokenFunction()
      const { data } = await axios.post(
        '/api/challenges/challenge/',
        {
          game_id: game.id,
          difficulty_id: difficulties[difficulty],
          theme_id: themes[theme],
          seed: seed,
        },
        userToken
      )
      setChallenge(data)
      setCurrentChallenge(data)
      getUserChallenge(data.user_challenge_id)
      console.log(data)
    } catch (error) {
      setError(error.response.data.detail)
    }
  }

  useEffect(() => {
    getChallenge()
  }, [game])


  return (
    <>
      <ChallengeBanner />
      {challenge && (
        <main className='game-main'>
          <div className="game-back">
            <button className='game-back-btn' onClick={backToChallenges}>Exit Challenge</button>
          </div>
          <div className="game-panel">
            <GameBoard
              challenge={challenge}
              totalScore={totalScore}
              setTotalScore={setTotalScore}
              challengeState={challengeState}
              revealedSquares={revealedSquares}
              setRevealedSquares={setRevealedSquares}
              setChallengeState={setChallengeState}
              imageURL={challenge.image_url}
              gridSize={gridSize}
              difficulty={difficulty}
              theme={theme}
              onSquareClick={(index) => console.log('Clicked square:', index)}
            />
            <div className="controls-and-error">
              <div className="game-controls">
                <input className='solution-input' type="text" value={userAnswer} onChange={handleInputChange} placeholder="Your Answer" />
                <button className='submit-solution' onClick={handleSubmit}>Submit</button>
              </div>
              <h2>{error && error}</h2>
            </div>
          </div>
        </ main>
      )}
    </>
  )
}

export default ChallengeIndivPage
