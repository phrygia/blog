import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_ERROR_REQUEST, REGISTER_REQUEST } from '../../redux/types'
// import styled from 'styled-components'
import { FormGroup, Modal, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'

function RegisterModal() {
  const [modal, setModal] = useState(false)
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [localMsg, setLocalMsg] = useState('')
  const { errorMsg } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const handleOpen = () => {
    setLocalMsg('')
    dispatch({
      type: CLEAR_ERROR_REQUEST,
    })
    setModal(!modal)
  }

  useEffect(() => {
    try {
      setLocalMsg(errorMsg)
    } catch (e) {
      console.error(e)
    }
  }, [errorMsg])

  const onChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password } = formValue
    const newUser = { name, email, password }
    console.log(newUser, ': newUser')

    const chk_num = newUser.password.search(/[0-9]/g)
    const chk_eng = newUser.password.search(/[a-z]/gi)
    const chk_spe = newUser.password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
    const chk_name = /([^가-힣\x20a-zA-Z])/i

    setLocalMsg('')

    if (chk_name.test(newUser.name)) {
      setLocalMsg('이름은 한글과 영문만 입력 가능합니다.')
      return false
    }

    if (newUser.password.length <= 7 || newUser.password.length > 15) {
      setLocalMsg('비밀번호를 7-15자리 이내로 입력해주세요.')
      return false
    } else if (newUser.password.search(/\s/) !== -1) {
      setLocalMsg('비밀번호에 공백을 입력하실 수 없습니다.')
      return false
    } else if ((chk_num < 0 && chk_eng < 0) || (chk_eng < 0 && chk_spe < 0) || (chk_spe < 0 && chk_num < 0)) {
      setLocalMsg('비밀번호를 영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요')
      return false
    }
    dispatch({
      type: REGISTER_REQUEST,
      payload: newUser,
    })
  }

  const handleClose = () => {
    setModal(false)
  }

  const modalContent = (
    <section className="custom-modal-container">
      <article className="modal-header">
        <h2>Register</h2>
        <button onClick={handleClose}>
          <CloseIcon />
        </button>
      </article>
      <article className="modal-body">
        {localMsg ? <Alert severity="error">{localMsg}</Alert> : null}
        <form onSubmit={onSubmit}>
          <FormGroup>
            <TextField
              id="name"
              label="Name"
              name="name"
              onChange={onChange}
              placeholder="이름을 입력해주세요."
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              id="email"
              label="E-mail"
              type="email"
              name="email"
              onChange={onChange}
              placeholder="이메일을 입력해주세요."
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              name="password"
              onChange={onChange}
              placeholder="비밀번호를 입력해주세요."
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </FormGroup>
          <button variant="contained" color="secondary" type="submit">
            회원가입
          </button>
        </form>
      </article>
    </section>
  )

  return (
    <>
      <button onClick={handleOpen}>Register</button>
      <Modal open={modal} onClose={handleClose}>
        {modalContent}
      </Modal>
    </>
  )
}

export default RegisterModal
