import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userTokenFunction } from '../../helpers/auth'
import GameContext from '../../GameContext'
import GameBoard from '../game/GameBoard'

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

  const { seed, game } = useContext(GameContext)

  const [error, setError] = useState('')
  const [challenge, setChallenge] = useState()


  const { difficulty, theme } = useParams()

  useEffect(() => {
    if (!difficulties[difficulty] || !themes[theme]) {
      setError('Invalid difficulty/theme')
    }

    if (!game) {
      setError('Game not started')
    }
  }, [])

  useEffect(() => {
    const getChallenge = async () => {
      if (game) {
        try {
          const userToken = userTokenFunction()
          const { data } = await axios.post('/api/challenges/challenge/', {
            game_id: game.id,
            difficulty_id: difficulties[difficulty],
            theme_id: themes[theme],
            seed,
          }, userToken)
          setChallenge(data)
        } catch (error) {
          console.log(error)
          setError(error.response.data.detail)
        }
      }
    }
    getChallenge()
  }, [])

  return (
    <>
      {error && <h1>{error}</h1>}
      {challenge && (
        <>
          <h1>Challenge</h1>
          <GameBoard
            imageURL={challenge.image_url}
            gridSize={challenge.grid_size}
            onSquareClick={(index) => console.log('Clicked square:', index)}
          />
        </>
      )}
    </>
  )
}

export default ChallengeIndivPage