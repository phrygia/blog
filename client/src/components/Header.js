import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Member from './Member'
import SearchInput from './search/SearchInput'
import { GitHub, Drafts, Home } from '@material-ui/icons'
import bg from '../assets/img/bg.jpg'

const HeaderWrapper = styled.header`
  width: 100%;
  font-family: 'Lato', sans-serif;
  background: url(${bg}) no-repeat fixed center 0/ 100% auto;

  @media ${(props) => props.theme.pc} {
    height: 450px;
  }
  @media ${(props) => props.theme.mo} {
    height: 300px;
  }
`
const HeaderInner = styled.section`
  margin: 0 auto;
  width: 100%;
  article {
    width: 100%;
    color: #fff;
    &:not(:nth-child(2)) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    & > ul {
      display: flex;
    }
    .blog-title {
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
  }

  @media ${(props) => props.theme.pc} {
    max-width: 1120px;
    padding: 0 4vw;
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
        <article>
          <Link to="/" className="blog-title">
            phrygia react blog
          </Link>
          <ul>
            <li>
              <SearchInput />
            </li>
            <li>
              <a href="https://github.com/phrygia" target="_blank" rel="noreferrer">
                <GitHub />
              </a>
            </li>
            <li>
              <a href="mailto:dmsgp62@gmail.com">
                <Drafts />
              </a>
            </li>
            <li>
              <Link to="/">
                <Home />
              </Link>
            </li>
          </ul>
        </article>
        <article>
          <h1>Ghost & Gatsby</h1>
          <p>Thoughts, stories and JAMstack</p>
        </article>
        <article>
          <nav>
            <Member />
          </nav>
        </article>
      </HeaderInner>
    </HeaderWrapper>
  )
}

export default withRouter(Header)
