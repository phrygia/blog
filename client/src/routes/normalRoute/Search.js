import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostCardOne from '../../components/post/PostCardOne'
import { SEARCH_REQUEST } from '../../redux/types'

function Search() {
  const dispatch = useDispatch()
  let { search_result } = useParams()
  const { searchResult } = useSelector((state) => state.post)

  useEffect(() => {
    if (search_result) {
      dispatch({
        type: SEARCH_REQUEST,
        payload: search_result,
      })
    }
  }, [dispatch, search_result])

  return (
    <div>
      <h1>검색결과: {search_result}</h1>
      {searchResult && <PostCardOne posts={searchResult} result={true} />}
    </div>
  )
}

export default Search
