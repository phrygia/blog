import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { SEARCH_REQUEST } from '../../redux/types'

function SearchInput() {
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
    <>
      <form onSubmit={onSubmit} style={{ display: 'inline-block', marginLeft: '20px' }}>
        <input name="searchBy" onChange={onChange} ref={resetValue} />
        <button onClick={onClick}>click</button>
      </form>
    </>
  )
}

export default SearchInput
