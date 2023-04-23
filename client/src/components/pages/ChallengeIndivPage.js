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

  const { seed, game, setCurrentChallenge, userPoints, setUserPoints } = useContext(GameContext)


  const [error, setError] = useState('')
  const [challenge, setChallenge] = useState()
  const [challengeState, setChallengeState] = useState(new Set())
  const [userAnswer, setUserAnswer] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [totalScore, setTotalScore] = useState(1200)

  const gridSize = 25

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value)
  }

  const navigate = useNavigate()

  const backToChallenges = () => {
    navigate('/challenges')
  }

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
        setSuccessMessage('Congratulations! Your answer is correct.')
        setUserPoints(userPoints + data.points_scored)
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

    if (!game) {
      setError('Game not started')
    }
  }, [])

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
      const challengeKey = `${difficulty}_${theme}`
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
      {error && <h1>{error}</h1>}
      {successMessage && <h1>{successMessage}</h1>}
      {challenge && (
        <>
          <h1>Challenge</h1>
          <GameBoard
            challenge={challenge}
            totalScore={totalScore}
            setTotalScore={setTotalScore}
            challengeState={challengeState}
            setChallengeState={setChallengeState}
            imageURL={challenge.image_url}
            gridSize={gridSize}
            onSquareClick={(index) => console.log('Clicked square:', index)}
          />
          <input type="text" value={userAnswer} onChange={handleInputChange} placeholder="Enter your answer" />
          {console.log('CHALLENGE', challenge)}
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={backToChallenges}>Back</button>
        </>
      )}
    </>
  )
}

export default ChallengeIndivPage
