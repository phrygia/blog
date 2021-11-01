import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostCardOne from '../../components/post/PostCardOne'
import { SEARCH_REQUEST } from '../../redux/types'
import styled from 'styled-components'

const SearchBox = styled.div`
  & > h2 {
    text-align: center;
  }
  @media ${(props) => props.theme.pc} {
    & > h2 {
      margin-bottom: 50px;
      padding-bottom: 7px;
      font-size: 25px;
    }
  }
  @media ${(props) => props.theme.mo} {
    & > h2 {
      margin-top: 40px;
      margin-bottom: 30px;
      font-size: 20px;
    }
  }
`

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
    <SearchBox>
      <h2>검색결과: {search_result}</h2>
      {searchResult && <PostCardOne posts={searchResult} result={true} />}
    </SearchBox>
  )
}

export default Search
