import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from '../../redux/types';
// import styled from 'styled-components'
import { FormGroup, Modal, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

function LoginModal() {
  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState('');
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { errorMsg } = useSelector(state => state.auth);

  useEffect(() => {
    try {
      setLocalMsg(errorMsg);
    } catch (e) {
      console.log(e);
    }
  }, [errorMsg]);

  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST,
    });
    setModal(true);
  };

  const onChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { email, password } = formValues;
    const user = { email, password };
    dispatch({
      type: LOGIN_REQUEST,
      payload: user,
    });
  };
  const handleClose = () => {
    setModal(false);
  };

  const modalContent = (
    <section className="custom-modal-container">
      <article className="modal-header">
        <h2>Login</h2>
        <button onClick={handleClose}>
          <CloseIcon />
        </button>
      </article>
      <article className="modal-body">
        {localMsg ? <Alert severity="error">{localMsg}</Alert> : null}
        <form onSubmit={onSubmit}>
          <FormGroup>
            <TextField
              id="email"
              label="E-mail"
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              onChange={onChange}
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
              placeholder="비밀번호를 입력해주세요."
              onChange={onChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </FormGroup>
          <button variant="contained" color="secondary" type="submit">
            로그인
          </button>
        </form>
      </article>
    </section>
  );

  return (
    <>
      <button onClick={handleToggle}>Login</button>
      <Modal open={modal} onClose={handleClose}>
        {modalContent}
      </Modal>
    </>
  );
}

export default LoginModal;
