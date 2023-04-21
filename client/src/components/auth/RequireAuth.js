import { Navigate, Outlet } from 'react-router-dom'
import UserContext from '../../UserContext'
import { useContext } from 'react'

const RequireAuth = ({ redirectTo }) => {
  const { isAuthenticated } = useContext(UserContext)
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />
  }
  return <Outlet />
}

export default RequireAuth