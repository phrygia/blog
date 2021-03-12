import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GitHub, Drafts, Home } from '@material-ui/icons'

const FooterWrapper = styled.footer`
  clear: both;
  width: 100%;
  font-family: 'Noto Sans KR', sans-serif;

  @media ${(props) => props.theme.mo} {
    margin-top: 1em;
  }
`
const FooterInner = styled.section`
  max-width: 1020px;
  margin: 3em auto 0;
  padding: 2rem 0;

  ul {
    display: flex;
    li {
      position: relative;
      a {
        display: inline-block;
        color: #777;
      }
    }
  }
  p {
    display: inline-block;
    color: #000;
    font-size: 0.8rem;
  }

  @media ${(props) => props.theme.pc} {
    width: 80%;
    ul {
      float: left;
      li {
        a {
          margin-right: 15px;
        }
        &:first-child {
          svg {
            font-size: 18px;
          }
        }
        &:nth-child(2) {
          svg {
            font-size: 21px;
          }
        }
        &:nth-child(3) {
          top: -1px;
          svg {
            font-size: 22px;
          }
        }
      }
    }
    p {
      float: right;
    }
  }
  @media ${(props) => props.theme.mo} {
    width: 90%;
    text-align: center;
    ul {
      justify-content: center;
      li {
        a {
          margin: 0 8px 3px;
        }
        &:first-child {
          svg {
            font-size: 18px;
          }
        }
        &:nth-child(2) {
          top: 2px;
          svg {
            font-size: 19px;
          }
        }
        &:nth-child(3) {
          svg {
            font-size: 21px;
          }
        }
      }
    }
    p {
      font-size: 12px;
    }
  }
`

function Footer() {
  const thisYser = new Date().getFullYear()
  const goToTop = useRef()

  useEffect(() => {
    goToTop &&
      window.addEventListener('scroll', function () {
        if (this.scrollY > 200) {
          goToTop.current.classList.add('on')
        } else {
          goToTop.current.classList.remove('on')
        }
      })
    return () => {
      window.removeEventListener('scroll')
      window.removeEventListener('scrollTo')
    }
  }, [goToTop])

  const goToTopBtn = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <FooterWrapper>
      <FooterInner>
        <ul>
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
        <p>&copy; {thisYser} phrygia. Made by phrygia with react.</p>
      </FooterInner>
      <button id="go-to-top" ref={goToTop} onClick={goToTopBtn}>
        <span className="left" />
        <span className="right" />
        <p>Back To Top</p>
      </button>
    </FooterWrapper>
  )
}

export default Footer
