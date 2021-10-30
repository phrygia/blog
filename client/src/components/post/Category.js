import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Ul = styled.ul`
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  li {
    border-radius: 5px;
    font-weight: 500;
    transition: all 0.2s ease;
    a {
      display: inline-block;
      color: #6e6d7a;
      text-transform: uppercase;
    }
    &:hover {
      background-color: #f1f1f1;
      a {
        color: #111;
      }
    }
  }
  @media ${(props) => props.theme.pc} {
    li {
      font-size: 15px;
      a {
        padding: 10px 12px;
      }
    }
  }
  @media ${(props) => props.theme.mo} {
    li {
      font-size: 14px;
    }
  }
`

function Category({ posts }) {
  return (
    <Ul>
      {Array.isArray(posts)
        ? posts.map(({ _id, category_name, posts }, index) => (
            <li key={_id + index}>
              <Link to={`/post/category/${category_name}`}>
                {category_name} ({posts.length})
              </Link>
            </li>
          ))
        : null}
    </Ul>
  )
}

export default Category
