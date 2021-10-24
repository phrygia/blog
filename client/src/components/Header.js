import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Member from './Member'
import SearchInput from './search/SearchInput'

const HeaderWrapper = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  font-family: 'Lato', sans-serif;
  border-bottom: 1px solid #f1f1f1;
  background-color: #f8f8f8;
`
const HeaderInner = styled.section`
  margin: 1rem auto;
  max-width: 1020px;
  .blog-title {
    color: #323232;
    display: inline-block;
    font-weight: 700;
  }
  nav {
    button,
    a {
      font-family: 'Lato', sans-serif;
      border: 0;
      background-color: transparent;
      outline: none;
      float: left;
      display: inline-block;
      opacity: 0.6;
      transition: all 0.2s ease-out;
      &:hover {
        opacity: 1;
      }
    }
  }

  @media ${(props) => props.theme.pc} {
    width: 80% !important;
    height: 30px;
    line-height: 30px;
    nav {
      display: inline-block;
      float: right;
      text-align: right;
      * {
        height: 27px;
        padding: 0 1.3rem 0 0;
        font-size: 16px;
      }
    }
    .blog-title {
      font-size: 24px;
    }
  }

  @media ${(props) => props.theme.mo} {
    width: 90%;
    margin-bottom: 18px;
    text-align: center;
    .blog-title {
      font-size: 20px;
    }
    nav {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 16px;
      * {
        margin: 0 10px;
        font-size: 13px;
      }
      button:last-child,
      span {
        display: none;
      }
    }
  }
`

function Header() {
  return (
    <HeaderWrapper>
      <HeaderInner container alignItems="center">
        <Link to="/" className="blog-title">
          phrygia react board
        </Link>
        <SearchInput />
        <nav>
          <Member />
        </nav>
      </HeaderInner>
    </HeaderWrapper>
  )
}

export default Header
