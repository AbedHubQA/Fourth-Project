import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import GameContext from './GameContext'
import UserContext from './UserContext'
import { userTokenFunction } from './helpers/auth'

const GameProvider = ({ children }) => {

  const { user, isAuthenticated } = useContext(UserContext)

  const [seed, setSeed] = useState(0)
  const [gameDataFetched, setGameDataFetched] = useState(false)
  const [game, setGame] = useState()
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(null)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [userPoints, setUserPoints] = useState(0)
  const [userRank, setUserRank] = useState(0)
  const [gameInProgress, setGameInProgress] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState(null)
  const [sections, setSections] = useState([])
  const [sectionsStatus, setSectionsStatus] = useState([])


  useEffect(() => {
    const getSections = async () => {
      try {
        const { data } = await axios.get('/api/challenges/sections/')
        setSections(data)
      } catch (error) {
        setError(error.response.data.detail)
      }
    }
    const getSectionsStatus = async () => {
      try {
        const userToken = userTokenFunction()
        const { data } = await axios.get('/api/games/active-challenges/', userToken)
        setSectionsStatus(data)
      } catch (error) {
        setError(error.response.data.detail)
      }
    }
    getSections()
    getSectionsStatus()
  }, [game, userPoints])



  useEffect(() => {
    if (game && challengesCompleted === 12) {
      setGameInProgress(false)
      updateUserGameStatus(true)
    }
  }, [game, challengesCompleted])

  const fetchUserRankAndPoints = async () => {
    if (!game) {
      return
    }
    try {
      const { data } = await axios.get('/api/leaderboard/')
      const userEntry = data.find(
        (entry) => entry.user.id === user.id && entry.game === game.id
      )
      if (userEntry) {
        setUserPoints(userEntry.total_points)
        setUserRank(userEntry.user.rank)
      } else {
        setUserPoints(0)
        setUserRank(data.length + 1)
      }
      setGameDataFetched(true)
    } catch (error) {
      console.error('Error fetching leaderboard data', error)
    }
  }

  useEffect(() => {
    if (game && user && !gameDataFetched) {
      fetchUserRankAndPoints()
    }
  }, [game, user, gameDataFetched, challengesCompleted, userPoints, userRank])


  useEffect(() => {
    if (user) {
      setGame(null)
      setGameDataFetched(false)
      setChallengesCompleted(0)
      setUserPoints(0)
      setUserRank(0)
      setCountdown(null)
      setGameInProgress(false)
      fetchActiveGame()
    }
  }, [user, isAuthenticated])

  const updateUserGameStatus = async (isCompleted, gameData = null) => {
    try {
      if (!isAuthenticated) {
        return
      }
      const userToken = userTokenFunction()
      const gameId = gameData ? gameData.id : game.id
      await axios.put(
        `/api/games/${gameId}/`,
        { is_completed: isCompleted },
        userToken
      )
      setGame(null)
    } catch (error) {
      console.error('Error updating User_Game status', error)
    }
  }


  const fetchActiveGame = async () => {
    try {
      const userToken = userTokenFunction()
      const { data } = await axios.get('/api/games/active/', userToken)
      if (data.message && data.message === 'No active game') {
        setGame(null)
        setGameInProgress(false)
      } else {
        const endTime = new Date(data.end_time)
        const currentTime = new Date()
        const remainingTime = Math.floor((endTime - currentTime) / 1000)

        if (remainingTime > 0) {
          setGame(data)
          setCountdown(remainingTime)
          setGameInProgress(true)
        } else {
          if (game) {
            updateUserGameStatus(true)
          } else {
            updateUserGameStatus(true, data)
          }
          setGame(null)
          setGameInProgress(false)
        }
      }
    } catch (error) {
      console.error('Error fetching active game', error)
    }
  }

  useEffect(() => {
    if (user && game && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (user && game && countdown === 0) {
      if (isAuthenticated) {
        setGameInProgress(false)
        updateUserGameStatus(true)
      }
    }
  }, [game, countdown, user])
  

  const createGame = async () => {
    try {
      setSeed(Math.floor(Math.random() * 100000))
      const userToken = userTokenFunction()
      const { data } = await axios.post('/api/games/', {}, userToken)
      setGame(data)
      setGameDataFetched(false)
      fetchUserRankAndPoints()
    } catch (error) {
      setError(error.response.data.detail)
    }
  }

  return (
    <GameContext.Provider value={{ seed, game, createGame, error, countdown, setCountdown, gameInProgress, setGameInProgress, challengesCompleted, setChallengesCompleted, userPoints, setUserPoints, userRank, setUserRank, fetchUserRankAndPoints, gameDataFetched, currentChallenge, setCurrentChallenge, sections, sectionsStatus }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
