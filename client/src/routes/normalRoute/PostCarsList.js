import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { POSTS_LOADING_REQUEST } from '../../redux/types'
import { Helmet } from 'react-helmet'
import { GrowingSpinner } from '../../components/Spinner'
import PostCardOne from '../../components/post/PostCardOne'
import Category from '../../components/post/Category'
import { Alert } from '@material-ui/lab'

function PostCarsList() {
  const { posts, categoryFindResult, loading, postCount } = useSelector((state) => state.post)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: POSTS_LOADING_REQUEST, payload: 0 })
  }, [dispatch])

  ////////////////////////////////////////
  const skipNumberRef = useRef(0)
  const postCountRef = useRef(0)
  const endMsg = useRef(false)

  postCountRef.current = postCount - 6

  const useOnScreen = (options) => {
    const lastPostElementRef = useRef()

    const [visible, setVisible] = useState(false)

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting)

        if (entry.isIntersecting) {
          let remainPostCount = postCountRef.current - skipNumberRef.current
          if (remainPostCount >= 0) {
            dispatch({
              type: POSTS_LOADING_REQUEST,
              payload: skipNumberRef.current + 6,
            })
            skipNumberRef.current += 6
          } else {
            endMsg.current = true
          }
        }
      }, options)

      if (lastPostElementRef.current) {
        observer.observe(lastPostElementRef.current)
      }

      const LastElementReturnFunc = () => {
        if (lastPostElementRef.current) {
          observer.unobserve(lastPostElementRef.current)
        }
      }

      return LastElementReturnFunc
    }, [lastPostElementRef, options])

    return [lastPostElementRef, visible]
  }

  ////////////////////////////////////////
  const [lastPostElementRef] = useOnScreen({
    threshold: '0.5',
  })
  // console.log(visible, 'visible', skipNumberRef.current, 'skipNum')

  return (
    <>
      <Helmet title="Home" />
      <Category posts={categoryFindResult} />
      {posts ? <PostCardOne posts={posts} /> : GrowingSpinner}

      <div ref={lastPostElementRef}>{loading && GrowingSpinner}</div>
      {loading ? null : endMsg ? (
        <div>
          <Alert severity="error">더 이상의 포스트는 없습니다</Alert>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default PostCarsList
