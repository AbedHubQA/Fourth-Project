import * as React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ExtensionIcon from '@mui/icons-material/Extension'
import AppLogo from '../common/AppLogo'
import CompanyLogo from '../common/CompanyLogo'

function ResponsiveAppBar() {
  const username = 'A'
  const location = useLocation()

  const isChallengesActive = location.pathname === '/challenges';
  const isLeaderboardActive = location.pathname === '/leaderboard';

  return (
    <AppBar position="static" sx={{ background: 'black', boxShadow: 'none' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex', sm: 'flex' } }}>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <CompanyLogo alt="Company Logo" sx={{ mr: 3, cursor: 'pointer' }} />
            </NavLink>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <AppLogo alt="App Logo" sx={{ mr: 3, cursor: 'pointer' }} />
            </NavLink>
          </Box>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex', sm: 'flex' } }}>
          <Typography
            variant="h6"
            component={NavLink}
            to="/challenges"
            sx={{
              flexGrow: 1,
              fontSize: '1.1rem',
              textDecoration: 'none',
              color: 'white',
              position: 'relative',
              '&.active': {
                fontWeight: 'bold',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-17.9px',
                  left: '0',
                  width: '100%',
                  height: '3.5px',
                  backgroundColor: '#FF9C07',
                },
              },
            }}
          >
            Challenges
          </Typography>
          <Typography
            variant="h6"
            component={NavLink}
            to="/leaderboard"
            sx={{
              ml: 3,
              flexGrow: 1,
              fontSize: '1.1rem',
              textDecoration: 'none',
              color: 'white',
              position: 'relative',
              '&.active': {
                fontWeight: 'bold',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-17.9px',
                  left: '0',
                  width: '100%',
                  height: '3.5px',
                  backgroundColor: '#FF9C07',
                },
              },
            }}
          >
            Leaderboard
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none', sm: 'none' }, flexGrow: 1 }} className="mobile-container">
          <div className='company-logo'>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <CompanyLogo alt="Company Logo" sx={{ cursor: 'pointer' }} />
            </NavLink>
          </div>
          <div className='mobile-icons'>
            <NavLink to="/challenges" style={{ textDecoration: 'none' }}>
              <IconButton color="inherit" className='nav-icons-spacing'>
                <ExtensionIcon className={`nav-icons-sizing ${isChallengesActive ? 'active-icon' : ''}`} />
              </IconButton>
            </NavLink>
            <NavLink to="/leaderboard" style={{ textDecoration: 'none' }}>
              <IconButton color="inherit" className='nav-icons-spacing'>
                <EmojiEventsIcon className={`nav-icons-sizing ${isLeaderboardActive ? 'active-icon' : ''}`} />
              </IconButton>
            </NavLink>
          </div>
        </Box>
        <Avatar className='avatar' sx={{ cursor: 'pointer' }}>{username[0].toUpperCase()}</Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
