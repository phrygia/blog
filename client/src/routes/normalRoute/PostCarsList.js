import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { POSTS_LOADING_REQUEST } from '../../redux/types'
import { Helmet } from 'react-helmet'
import { GrowingSpinner } from '../../components/Spinner'
import PostCardOne from '../../components/post/PostCardOne'

function PostCarsList() {
  const { posts } = useSelector((state) => state.post)
  // console.log(posts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: POSTS_LOADING_REQUEST,
    })
  }, [dispatch])

  return (
    <>
      <Helmet title="Home" />
      {posts ? <PostCardOne posts={posts} /> : GrowingSpinner}
    </>
  )
}

export default PostCarsList
