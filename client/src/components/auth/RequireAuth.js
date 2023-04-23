import { Navigate, Outlet } from 'react-router-dom'
import UserContext from '../../UserContext'
import { useContext, useEffect, useState } from 'react'

const RequireAuth = ({ redirectTo }) => {
  const { isAuthenticated } = useContext(UserContext)
  const [authStatus, setAuthStatus] = useState(isAuthenticated())

  useEffect(() => {
    setAuthStatus(isAuthenticated())
  }, [isAuthenticated])

  if (!authStatus) {
    return <Navigate to={redirectTo} />
  }
  return <Outlet />
}

export default RequireAuth