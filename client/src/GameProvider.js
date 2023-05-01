import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import GameContext from './GameContext'
import UserContext from './UserContext'
import { userTokenFunction } from './helpers/auth'
import GameOutcome from './components/game/GameOutcome'

const GameProvider = ({ children }) => {

  const { user, isAuthenticated } = useContext(UserContext)

  const [error, setError] = useState('')
  const [game, setGame] = useState()
  const [gameDataFetched, setGameDataFetched] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [userPoints, setUserPoints] = useState(0)
  const [userRank, setUserRank] = useState(0)
  const [gameInProgress, setGameInProgress] = useState(false)
  const [sections, setSections] = useState([])
  const [sectionsStatus, setSectionsStatus] = useState([])
  const [totalCompleted, setTotalCompleted] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [completedChallenges, setCompletedChallenges] = useState(0)

  // Reset game data when user logs out or logs in
  useEffect(() => {
    if (!user) {
      setError('')
      setGame(null)
      setGameDataFetched(false)
      setCountdown(null)
      setUserPoints(0)
      setUserRank(0)
      setGameInProgress(false)
      setSections([])
      setSectionsStatus([])
      setTotalCompleted(0)
      setShowModal(false)
      setCompletedChallenges(0)
    } else {
      fetchActiveGame()
    }
  }, [user, isAuthenticated])

  const getSections = async () => {
    try {
      const { data } = await axios.get('/api/challenges/sections/')
      setSections(data)
    } catch (error) {
      setError(error.response.data.detail)
    }
  }

  const getSectionsStatus = async () => {
    if (!isAuthenticated()) return
    try {
      const userToken = userTokenFunction()
      const { data } = await axios.get('/api/games/active-challenges/', userToken)
      setSectionsStatus(data)
    } catch (error) {
      setError(error.response.data.detail)
    }
  }

  const checkAllChallengesCompleted = () => {
    return sectionsStatus.length > 0 && sectionsStatus.every(section =>
      section.themes.every(theme => theme.is_completed)
    )
  }

  const handleModalDisplay = () => {
    const allChallengesCompleted = checkAllChallengesCompleted()
    if (allChallengesCompleted || countdown === 0) {
      setCompletedChallenges(totalCompleted)
      setShowModal(true)
      setCountdown(null)
      setGameDataFetched(false)
      setGameInProgress(false)
      updateUserGameStatus(true)
    }
  }

  useEffect(() => {
    const newTotalCompleted = sectionsStatus.length > 0 ? sectionsStatus.reduce((acc, cur) => acc += cur.themes.filter((t) => t.is_completed).length, 0) : 0
    setTotalCompleted(newTotalCompleted)
  }, [sectionsStatus])

  const fetchUserRankAndPoints = async (gameData = null) => {
    const currentGame = gameData ? gameData : game
    if (!currentGame) {
      return
    }
    try {
      const { data } = await axios.get('/api/leaderboard/')
      const userEntry = data.find(
        (entry) => entry.user.id === user.id && entry.game === currentGame.id
      )
      if (userEntry) {
        setUserPoints(userEntry.total_points)
        setUserRank(userEntry.user.rank)
      } else {
        setUserPoints(0)
        setUserRank(0)
      }
      setGameDataFetched(true)
    } catch (error) {
      console.error('Error fetching leaderboard data', error)
    }
  }

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
          fetchUserRankAndPoints(data)
        } else {
          updateUserGameStatus(true, data)
          setGame(null)
          setGameInProgress(false)
          setSectionsStatus([])
        }
      }
    } catch (error) {
      console.error('Error fetching active game', error)
    }
  }

  useEffect(() => {
    if (game) {
      handleModalDisplay()
    }
    if (user && game && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (user && game && countdown === 0) {
      if (isAuthenticated) {
        setGameDataFetched(false)
        setGameInProgress(false)
        if (!showModal) {
          updateUserGameStatus(true)
        }
      }
    }
  }, [game, countdown, user])


  const createGame = async () => {
    try {
      const newSeed = Math.floor(Math.random() * 100000)
      const userToken = userTokenFunction()
      const { data } = await axios.post('/api/games/', { seed: newSeed }, userToken)
      setGame(data)
      fetchUserRankAndPoints(data)
      setTotalCompleted(0)
    } catch (error) {
      setError(error.response.data.detail)
    }
  }

  return (
    <GameContext.Provider value={{ game, createGame, error, countdown, setCountdown, gameInProgress, setGameInProgress, userPoints, setUserPoints, userRank, setUserRank, fetchUserRankAndPoints, gameDataFetched, sections, sectionsStatus, totalCompleted, setTotalCompleted, getSections, getSectionsStatus, completedChallenges, setShowModal }}>
      {showModal && <GameOutcome />}
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
