import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LOGOUT_REQUEST } from '../redux/types'
import LoginModal from './auth/LoginModal'
import RegisterModal from './auth/RegisterModal'

function Member() {
  const { isAuthenticated, user, userRole } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    })
  }, [dispatch])

  // const addPostLink = () => {}

  const authLink = (
    <>
      {userRole === 'Admin' ? (
        <>
          <Link to="/post" className="buttn">
            Add Post
          </Link>
        </>
      ) : (
        ''
      )}
      <>
        <button onClick={onLogout}>Logout</button>
        {
          user && user.name ? (
            <>
              <Link to={`/user/${user.name}/profile`}> {user ? `Welcome ${user.name}` : ''}</Link>
            </>
          ) : (
            // <button>
            <strong>No user</strong>
          )
          // </button>
        }
      </>
    </>
  )

  const guestLink = (
    <>
      <LoginModal />
      <RegisterModal />
    </>
  )

  return (
    <>
      <button>About</button>
      {isAuthenticated ? <>{authLink}</> : <>{guestLink}</>}
    </>
  )
}

export default Member
