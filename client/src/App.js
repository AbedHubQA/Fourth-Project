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
import RequireAuth from './components/auth/RequireAuth'

const App = () => {

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/challenges' element={<RequireAuth redirectTo='/login' />}>
            <Route index element={<ChallengesPage />} />
          </Route>
          <Route path='/challenge/:difficulty/:theme' element={<RequireAuth redirectTo='/login' />}>
            <Route index element={<ChallengeIndivPage />} />
          </Route>
          <Route path='/leaderboard' element={<RequireAuth redirectTo='/login' />}>
            <Route index element={<LeaderboardPage />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
