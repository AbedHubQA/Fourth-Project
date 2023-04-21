import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GameContext from './GameContext'
import { userTokenFunction } from './helpers/auth'

const GameProvider = ({ children }) => {

  const [seed, setSeed] = useState(0)
  const [game, setGame] = useState()
  const [error, setError] = useState('')

  const createGame = async () => {
    try {
      setSeed(Math.random() * 100000)
      const userToken = userTokenFunction()
      const { data } = await axios.post('/api/games/', {}, userToken)
      setGame(data)
    } catch (error) {
      setError(error.response.data.detail)
    }
  }

  return (
    <GameContext.Provider value={{ seed, game, createGame, error }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
