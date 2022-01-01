import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  COMMENT_LOADING_REQUEST,
  COMMENT_UPLOADING_REQUEST,
} from '../../redux/types';
import styled from 'styled-components';

const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  outline: none;
  border: solid 1px #dadada;

  @media ${props => props.theme.pc} {
    height: 130px;
    padding: 14px;
    margin-top: 10px;
    font-size: 15px;
    line-height: 1.45;
  }
  @media ${props => props.theme.mo} {
    height: 90px;
    padding: 10px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  float: right;
  padding: 8px 14px;
  background-color: #26a8ed;
  color: #fff;
  border: 0;
  @media ${props => props.theme.pc} {
    margin: 10px 0 70px;
    font-size: 15px;
  }
  @media ${props => props.theme.mo} {
    margin: 10px 0 40px;
    font-size: 14px;
  }
`;

function Comments({ id, userId, userName }) {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({ contents: '' });
  const resetValue = useRef();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch({
      type: COMMENT_LOADING_REQUEST,
      payload: id,
    });
  }, [dispatch, id]);

  const onSubmit = e => {
    e.preventDefault();
    const { contents } = formValue;
    const token = localStorage.getItem('token');
    const body = {
      contents,
      token,
      id,
      userId,
      userName,
    };
    dispatch({
      type: COMMENT_UPLOADING_REQUEST,
      payload: body,
    });
    resetValue.current.value = '';
    setFormValue('');
  };

  const onChange = e => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const memeberCheck = () => {
    alert('비회원은 댓글을 남기실 수 없습니다 :)');
  };

  return isAuthenticated ? (
    <>
      <form onSubmit={onSubmit}>
        <TextArea
          name="contents"
          id="contents"
          onChange={onChange}
          ref={resetValue}
          placeholder="댓글은 언제나 환영입니다 :)"
          required
        />
        <Button>댓글 남기기</Button>
      </form>
    </>
  ) : (
    <>
      <TextArea
        name="contents"
        id="contents"
        value="로그인한 멤버만 댓글을 남기실 수 있습니다 "
        disabled
      />
      <Button onClick={memeberCheck}>댓글 남기기</Button>
    </>
  );
}

export default Comments;
