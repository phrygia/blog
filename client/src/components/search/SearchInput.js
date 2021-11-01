import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { SEARCH_REQUEST } from '../../redux/types'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

const Form = styled.div`
  position: relative;
  input {
    background-color: transparent;
    border: 0;
    color: #fff;
    padding-left: 30px;
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
      -webkit-transition: background-color 9999s ease-out;
      -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
      -webkit-text-fill-color: #fff !important;
    }
  }
  button {
    position: absolute;
    right: 0%;
    height: 28px;
    border: 1px solid #fff;
    background-color: transparent;
    color: #fff;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 1px;
    height: 1px;
    background-color: #fff;
  }
  @media ${(props) => props.theme.pc} {
    &:after {
      left: 28px;
      width: calc(100% - 64px);
    }
    input {
      width: 230px;
      height: 25px;
      font-size: 14px;
      padding-right: 40px;
    }
    button {
      width: 36px;
      font-size: 13px;
    }
  }
  @media ${(props) => props.theme.mo} {
    &:after {
      left: 28px;
      width: calc(100% - 62px);
    }
    input {
      width: 170px;
      height: 25px;
      font-size: 13px;
      padding-right: 32px;
    }
    button {
      width: 30px;
      font-size: 12px;
    }
  }
`

function SearchInput({ in: inProp }) {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ searchBy: '' })
  const resetValue = useRef()

  const onChange = () => {
    setForm({
      [resetValue.current.name]: resetValue.current.value,
    })
  }

  const onSubmit = async (e) => {
    await e.preventDefault()
    const { searchBy } = form
    if (searchBy.length === 0) return alert('검색어를 입력해주세요.')

    dispatch({
      type: SEARCH_REQUEST,
      payload: searchBy,
    })
    // resetValue.current.value = ''
  }

  return (
    <CSSTransition in={inProp} timeout={400} unmountOnExit appear classNames="fade">
      <Form>
        <input name="searchBy" onChange={onChange} ref={resetValue} />
        <button onClick={onSubmit}>검색</button>
      </Form>
    </CSSTransition>
  )
}

export default SearchInput
