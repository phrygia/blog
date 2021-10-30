import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { SEARCH_REQUEST } from '../../redux/types'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

const Form = styled.form`
  position: relative;
  input {
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid #fff;
    color: #fff;
    padding-left: 25px;
  }
  button {
    position: absolute;
    right: 0%;
    opacity: 0.1;
  }
  @media ${(props) => props.theme.pc} {
    input {
      width: 200px;
      height: 25px;
      font-size: 14px;
    }
    button {
      width: 25px;
      height: 25px;
    }
  }
  @media ${(props) => props.theme.mo} {
  }
`

function SearchInput({ in: inProp }) {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ searchBy: '' })
  const resetValue = useRef()

  const onClick = (e) => {
    onChange()
  }

  const onChange = () => {
    setForm({
      [resetValue.current.name]: resetValue.current.value,
    })
  }

  const onSubmit = async (e) => {
    await e.preventDefault()
    const { searchBy } = form

    dispatch({
      type: SEARCH_REQUEST,
      payload: searchBy,
    })
    resetValue.current.value = ''
  }

  return (
    <CSSTransition in={inProp} timeout={400} unmountOnExit appear classNames="fade">
      <Form onSubmit={onSubmit}>
        <input name="searchBy" onChange={onChange} ref={resetValue} />
        <button onClick={onClick}>click</button>
      </Form>
    </CSSTransition>
  )
}

export default SearchInput
