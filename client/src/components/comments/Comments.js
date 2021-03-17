import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { COMMENT_LOADING_REQUEST, COMMENT_UPLOADING_REQUEST } from '../../redux/types'

function Comments({ id, userId, userName }) {
  const dispatch = useDispatch()
  const [formValue, setFormValue] = useState({ contents: '' })
  const resetValue = useRef()
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch({
      type: COMMENT_LOADING_REQUEST,
      payload: id,
    })
  }, [dispatch, id])

  const onSubmit = (e) => {
    e.preventDefault()
    const { contents } = formValue
    const token = localStorage.getItem('token')
    const body = {
      contents,
      token,
      id,
      userId,
      userName,
    }
    dispatch({
      type: COMMENT_UPLOADING_REQUEST,
      payload: body,
    })
    resetValue.current.value = ''
    setFormValue('')
  }

  const onChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    })
  }

  const memeberCheck = () => {
    alert('멤버!')
  }

  return isAuthenticated ? (
    <>
      <form onSubmit={onSubmit}>
        <h4>Write Comment</h4>
        <textarea name="contents" id="contents" onChange={onChange} ref={resetValue} placeholder="Comment" required />
        <button>write</button>
      </form>
    </>
  ) : (
    <>
      <h4>Write Comment</h4>
      <textarea name="contents" id="contents" value="로그인한 멤버만 댓글을 남기실 수 있습니다 " disabled />
      <button onClick={memeberCheck}>write</button>
    </>
  )
}

export default Comments
