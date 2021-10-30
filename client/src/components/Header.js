import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Member from './Member'
import SearchInput from './search/SearchInput'
import { GitHub, Drafts, Apps, Search } from '@material-ui/icons'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import bg from '../assets/img/bg.jpg'
import profile from '../assets/img/cy2.png'

const HeaderWrapper = styled.header`
  width: 100%;
  font-family: 'Lato', sans-serif;
  background: url(${bg}) no-repeat fixed center 0/ 100% auto;

  @media ${(props) => props.theme.pc} {
    padding: 20px 0 30px;
  }
  @media ${(props) => props.theme.mo} {
    /* height: 300px; */
  }
`
const HeaderInner = styled.section`
  margin: 0 auto;
  width: 100%;

  article {
    position: relative;
    width: 100%;
    color: #fff;
    &:not(.he_text) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    & > ul {
      display: flex;
      li {
        margin-left: 15px;
        &.sch_box {
          position: relative;
          top: -2px;
          display: flex;
          .icon {
            position: absolute;
            left: 100%;
            transition: all 0.2s ease;
            z-index: 3;
          }
          &.on {
            .icon {
              right: auto;
              left: 0;
            }
          }
        }
      }
    }
    .blog-title {
      display: inline-block;
      font-weight: 700;
    }
    nav {
      display: flex;
      button,
      a {
        font-family: 'Lato', sans-serif;
        border: 0;
        background-color: transparent;
        outline: none;
        display: inline-block;
        opacity: 0.6;
        transition: all 0.2s ease-out;
        color: #fff;
        &:hover {
          opacity: 1;
        }
      }
    }
  }

  @media ${(props) => props.theme.pc} {
    max-width: 1120px;
    padding: 0 4vw;
    article {
      &.he_text {
        height: 320px;
        text-align: center;
        h1 {
          padding: 95px 0 5px;
          font-size: 40px;
        }
        p {
          display: block;
          font-size: 24px;
          opacity: 0.7;
          font-weight: 400;
        }
      }
      .blog-title {
        font-size: 24px;
      }
      img {
        position: absolute;
        right: 0;
        margin-top: -30px;
      }
      nav {
        * {
          margin-right: 20px;
        }
      }
    }
  }

  @media ${(props) => props.theme.mo} {
    width: 90%;
    margin-bottom: 18px;
    text-align: center;
    article {
      .blog-title {
        font-size: 20px;
      }
    }
  }
`

function Header() {
  const [postClass, setPostClass] = useState(true)
  const [search, setSearch] = useState(true)
  const [searchClass, setSearchClass] = useState('')
  const history = useLocation()

  useEffect(() => {
    if (history.pathname.includes('/post') && !history.pathname.includes('/category')) {
      setPostClass(false)
    } else {
      setPostClass(true)
    }
  }, [history])

  const handleSearch = () => {
    setSearch(!search)
    if (search) setSearchClass('')
    else setSearchClass('on')
  }

  return (
    <HeaderWrapper>
      <HeaderInner container alignItems="center">
        <article>
          <Link to="/" className="blog-title">
            <Apps />
          </Link>
          <ul>
            <li className={`sch_box ${searchClass}`}>
              <Search className="icon" style={{ cursor: 'pointer', fontSize: '1.6rem' }} onClick={handleSearch} />
              <SearchInput in={search} />
            </li>
            <li>
              <a href="https://github.com/phrygia" target="_blank" rel="noreferrer">
                <GitHub style={{ fontSize: '1.2rem' }} />
              </a>
            </li>
            <li>
              <a href="mailto:dmsgp62@gmail.com">
                <Drafts style={{ fontSize: '1.4rem' }} />
              </a>
            </li>
          </ul>
        </article>
        {postClass && (
          <article className="he_text">
            <h1>Phrygia React Blog</h1>
            <p>Thoughts, stories and Tech</p>
          </article>
        )}
        <article>
          <nav>
            <Member />
          </nav>
          <img src={profile} alt="" />
        </article>
      </HeaderInner>
    </HeaderWrapper>
  )
}

export default Header
