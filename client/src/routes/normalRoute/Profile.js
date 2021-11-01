import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CLEAR_ERROR_REQUEST, PASSWORD_EDIT_UPLOADING_REQUEST } from '../../redux/types'
import { Alert } from '@material-ui/lab'

function Profile() {
  const { userId, errorMsg, successMsg, previousMatchMsg } = useSelector((state) => state.auth)

  const { userName } = useParams()
  const [form, setValues] = useState({
    previousPassword: '',
    password: '',
    rePassword: '',
  })
  const dispatch = useDispatch()
  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async (e) => {
    await e.preventDefault()
    const { previousPassword, password, rePassword } = form
    const token = localStorage.getItem('token')

    const body = {
      password,
      token,
      previousPassword,
      rePassword,
      userId,
      userName,
    }

    dispatch({
      type: CLEAR_ERROR_REQUEST,
    })
    dispatch({
      type: PASSWORD_EDIT_UPLOADING_REQUEST,
      payload: body,
    })
  }

  return (
    <div>
      <Helmet title={`Profile | ${userName}님의 프로필`} />
      <div>
        <div>
          <div>
            <strong>비밀번호 수정하기</strong>
          </div>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="title">기존 비밀번호</label>
                <input
                  type="password"
                  name="previousPassword"
                  id="previousPassword"
                  className="form-control mb-2"
                  onChange={onChange}
                />
                {previousMatchMsg ? <Alert severity="error">{previousMatchMsg}</Alert> : ''}
              </div>
              <div>
                <label htmlFor="title">새로운 비밀번호</label>
                <input type="password" name="password" id="password" className="form-control" onChange={onChange} />
              </div>
              <div>
                <label htmlFor="title">비밀번호 확인</label>
                <input
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  className="form-control mb-2"
                  onChange={onChange}
                />
                {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : ''}
              </div>
              <button color="success" className="">
                수정하기
              </button>
              {successMsg ? <Alert severity="success">{successMsg}</Alert> : ''}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
