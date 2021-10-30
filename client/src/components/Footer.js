import React, { useState, useRef } from 'react'
import styled from 'styled-components'

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
  /* ul {
    display: flex;
    li {
      position: relative;
      a {
        display: inline-block;
        color: #777;
      }
    }
  } */

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
  const goToTop = useRef()
  const [classSt, setClassSt] = useState('')

  // useEffect(() => {
  //   goToTop &&
  //     window.addEventListener('scroll', function () {
  //       if (this.scrollY > 200) {
  //         setClassSt('on')
  //       } else {
  //         setClassSt('')
  //       }
  //     })
  //   return () => {
  //     goToTop && window.removeEventListener('scroll')
  //     goToTop && window.removeEventListener('scrollTo')
  //   }
  // }, [goToTop])

  // const goToTopBtn = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' })
  // }

  return (
    <FooterWrapper>
      <FooterInner>
        <p>&copy; {thisYser} phrygia. Made by phrygia with react.</p>
      </FooterInner>
      {/* <button id="go-to-top" className={`${classSt}`} ref={goToTop} onClick={goToTopBtn}>
        <span className="left" />
        <span className="right" />
        <p>Back To Top</p>
      </button> */}
    </FooterWrapper>
  )
}

export default Footer
