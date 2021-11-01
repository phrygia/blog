import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import PostCardOne from '../../components/post/PostCardOne'
import { CATEGORY_FIND_REQUEST } from '../../redux/types'
import styled from 'styled-components'

const Title = styled.div`
  text-align: center;
  h2 {
    display: inline-block;
    padding-bottom: 7px;
    border-bottom: 3px solid #000;
  }
  strong {
    display: block;
    padding-bottom: 10px;
    font-weight: 500;
  }
  @media ${(props) => props.theme.pc} {
    margin-bottom: 50px;
    h2 {
      margin-bottom: 15px;
    }
    strong {
      font-size: 18px;
    }
  }
  @media ${(props) => props.theme.mo} {
    margin-top: 40px;
    margin-bottom: 30px;
    h2 {
      margin-bottom: 10px;
      font-size: 20px;
    }
    strong {
      font-size: 15px;
    }
  }
`

function CategoryResult() {
  const { categoryFindResult } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  let { category_name } = useParams()
  const count = categoryFindResult.posts ? categoryFindResult.posts.length : null

  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: category_name,
    })
  }, [dispatch, category_name, categoryFindResult])

  return (
    <div>
      <Title>
        <h2>{category_name}</h2>
        <strong>{count} posts</strong>
      </Title>
      {categoryFindResult && <PostCardOne posts={categoryFindResult.posts} />}
    </div>
  )
}

export default CategoryResult
