import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CLEAR_ERROR_REQUEST, PASSWORD_EDIT_UPLOADING_REQUEST } from '../../redux/types'
import { Alert } from '@material-ui/lab'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

const FormBox = styled.div`
  h2 {
    text-align: center;
    font-weight: 500;
  }
  .MuiInput-formControl {
    margin-bottom: 10px;
  }
  input {
    padding-bottom: 10px;
  }
  button {
    width: 100%;
    border: 0;
    background-color: #26a8ed;
    color: #fff;
  }
  @media ${(props) => props.theme.pc} {
    width: 580px;
    padding: 60px 70px 80px;
    margin: 40px auto;
    border: solid 1px #dadada;
    h2 {
      margin-bottom: 40px;
    }
    button {
      height: 50px;
      margin-top: 30px;
      font-size: 15px;
    }
    .MuiAlert-standardError {
      margin-bottom: 20px;
    }
  }
  @media ${(props) => props.theme.mo} {
    h2 {
      margin: 40px 0 30px;
      font-size: 22px;
      line-height: 1.3;
    }
    .MuiInputLabel-animated {
      font-size: 15px;
    }
    button {
      margin: 30px 0 10px;
      height: 40px;
      font-size: 13px;
    }
  }
`

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
    <>
      <Helmet title={`Profile | ${userName}님의 프로필`} />
      <FormBox>
        <h2>새로운 비밀번호를 입력해 주세요.</h2>
        <form onSubmit={onSubmit}>
          <div>
            <TextField
              type="password"
              id="previousPassword"
              label="기존 비밀번호"
              name="previousPassword"
              fullWidth
              required
              onChange={onChange}
            />
            {/* <label htmlFor="title">기존 비밀번호</label>
            <input
              type="password"
              name="previousPassword"
              id="previousPassword"
              className="form-control mb-2"
              onChange={onChange}
            /> */}
            {previousMatchMsg ? <Alert severity="error">{previousMatchMsg}</Alert> : ''}
          </div>
          <div>
            <TextField
              type="password"
              id="password"
              label="새로운 비밀번호"
              name="password"
              fullWidth
              required
              onChange={onChange}
            />
            {/* <label htmlFor="title">새로운 비밀번호</label>
            <input type="password" name="password" id="password" className="form-control" onChange={onChange} /> */}
          </div>
          <div>
            <TextField
              type="password"
              id="rePassword"
              label="비밀번호 재입력"
              name="rePassword"
              fullWidth
              required
              onChange={onChange}
            />
            {/* <label htmlFor="title">비밀번호 재입력</label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              className="form-control mb-2"
              onChange={onChange}
            /> */}
            {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : ''}
          </div>
          <button color="success" className="">
            수정하기
          </button>
          {successMsg ? <Alert severity="success">{successMsg}</Alert> : ''}
        </form>
      </FormBox>
    </>
  )
}

export default Profile
