import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// 보호된 route
export const EditProtectedRoute = ({ component: Component, ...rest }) => {
  const { userId } = useSelector((state) => state.auth)
  const { creatorId } = useSelector((state) => state.post)

  return (
    //https://jeonghwan-kim.github.io/dev/2020/03/20/role-based-react-router.html
    <Route
      {...rest}
      render={(props) => {
        if (userId === creatorId) {
          //권한이 있을 경우
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.locaction,
                },
              }}
            />
          )
        }
      }}
    />
  )
}

// 보호된 route
export const ProfileProtectedRoute = ({ component: Component, ...rest }) => {
  const { userName } = useSelector((state) => state.auth)
  // console.log(userName)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (props.match.params.userName === userName) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      }}
    />
  )
}
