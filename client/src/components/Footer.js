import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ArrowDropDownCircle } from '@material-ui/icons'

const FooterWrapper = styled.footer`
  clear: both;
  width: 100%;
  background-color: #15171a;
  color: rgba(255, 255, 255, 0.7);
`
const FooterInner = styled.section`
  max-width: 1020px;
  margin-left: auto;
  margin-right: auto;

  @media ${(props) => props.theme.pc} {
    padding: 20px 0 40px;
    margin-top: 5rem;
    p {
      font-size: 13px;
    }
  }
  @media ${(props) => props.theme.mo} {
    padding: 20px 10px 25px;
    margin-top: 40px;
    p {
      text-align: center;
      font-size: 12px;
    }
  }
`

function Footer() {
  const thisYser = new Date().getFullYear()
  const [classSt, setClassSt] = useState('')

  useEffect(() => {
    window.addEventListener('scroll', function () {
      if (this.scrollY > 200) {
        setClassSt('on')
      } else {
        setClassSt('')
      }
    })
  }, [])

  const goToTopBtn = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <FooterWrapper>
      <FooterInner>
        <p>&copy; {thisYser} phrygia. Made by phrygia with react.</p>
      </FooterInner>
      {
        <button id="go-to-top" className={`${classSt}`} onClick={goToTopBtn}>
          <ArrowDropDownCircle />
        </button>
      }
    </FooterWrapper>
  )
}

export default Footer
