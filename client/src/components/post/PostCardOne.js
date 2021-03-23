import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Li = styled.li`
  border-bottom: 1px solid #e5e5e5;
  span {
    color: #aaa;
  }
  a:hover {
    h1:after {
      width: 5rem;
    }
  }
  h1 {
    position: relative;
    line-height: 1.4;
    word-break: break-all;
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: -5px;
      -webkit-transition: all 0.3s ease-out;
      transition: all 0.3s ease-out;
      background-color: #121212;
      height: 3px;
      width: 2rem;
    }
  }
  p {
    white-space: normal;
    line-height: 1.5;
    max-height: 2.9em;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #7d7d7e;
  }

  @media ${(props) => props.theme.pc} {
    padding: 2.1rem 0;
    span {
      font-size: 15px;
    }
    h1 {
      margin: 8px 0;
      font-size: 25px;
    }
    p {
      margin: 21px 0 0;
      font-size: 16px;
    }
  }
  @media ${(props) => props.theme.mo} {
    padding: 1.5rem 0;
    h1 {
      margin: 7px 0;
      font-size: 20px;
      &:after {
        height: 2px;
        bottom: -4px;
      }
    }
    p {
      margin: 13px 0;
      font-size: 14px;
    }
  }
`

function PostCardOne({ posts, result }) {
  // result가 true면 최신정렬하기 위해 .slice(0).reverse() 사용한 배열로 return 되고 (검색, 카테고리 결과) 설정안되어있으면 (글 리스트) 그냥 최신순으로 노출됨 -> server에서 최신순으로 정렬했기때문에
  return (
    <ul>
      {Array.isArray(posts)
        ? result
          ? posts
              .slice(0)
              .reverse()
              .map(({ _id, title, contents, date }, index) => {
                return (
                  <Li key={_id + index}>
                    <Link to={`/post/${_id}`}>
                      <span>{date.substring(0, 10)}</span>
                      <h1>{title}</h1>
                      <p>{contents.replace(/[<][^>]*[>]/gi, '')}</p>
                    </Link>
                  </Li>
                )
              })
          : posts.map(({ _id, title, contents, date }, index) => {
              return (
                <Li key={_id + index}>
                  <Link to={`/post/${_id}`}>
                    <span>{date.substring(0, 10)}</span>
                    <h1>{title}</h1>
                    <p>{contents.replace(/[<][^>]*[>]/gi, '')}</p>
                  </Link>
                </Li>
              )
            })
        : null}
    </ul>
  )
}

export default PostCardOne
