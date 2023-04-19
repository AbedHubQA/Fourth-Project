import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import ChallengesPage from './components/pages/ChallengesPage'
import ChallengeIndivPage from './components/pages/ChallengeIndivPage'
import LeaderboardPage from './components/pages/LeaderboardPage'
import PageNotFound from './components/pages/PageNotFound'
import NavBar from './components/header/NavBar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { ThemeProvider } from '@mui/material/styles'
import customTheme from './theme/theme'

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/challenges' element={<ChallengesPage />} />
          <Route path='/challenges/:challengeId' element={<ChallengeIndivPage />} />
          <Route path='/leaderboard' element={<LeaderboardPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
