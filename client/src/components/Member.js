import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LOGOUT_REQUEST } from '../redux/types'
import LoginModal from './auth/LoginModal'
import RegisterModal from './auth/RegisterModal'

function Member() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, userRole } = useSelector((state) => state.auth)
  // console.log(userRole, 'userRole')

  const dispatch = useDispatch()

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    })
  }, [dispatch])

  useEffect(() => {
    setIsOpen(false)
  }, [user])

  // const handleOpen = () => {
  //     setIsOpen(!isOpen)
  // }

  const addPostLink = () => {}

  // console.log(useSelector(state => state.auth))

  const authLink = (
    <>
      {userRole === 'Admin' ? (
        <>
          <Link to="post" className="buttn" onClick={addPostLink}>
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
              {/* <Link to="/"></Link> */}
              <span>{user ? `Welcome ${user.name}` : ''}</span>
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

  return <>{isAuthenticated ? <>{authLink}</> : <>{guestLink}</>}</>
}

export default Member
