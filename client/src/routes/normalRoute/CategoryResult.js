import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import PostCardOne from '../../components/post/PostCardOne'
import { CATEGORY_FIND_REQUEST } from '../../redux/types'

function CategoryResult() {
  const { categoryFindResult } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  let { category_name } = useParams()

  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: category_name,
    })
  }, [dispatch, category_name])
  return (
    <div>
      <h1>Category: {category_name}</h1>
      {categoryFindResult && <PostCardOne posts={categoryFindResult.posts} result={true} />}
    </div>
  )
}

export default CategoryResult
