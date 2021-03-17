import axios from 'axios'
import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import {
  COMMENT_LOADING_FAILURE,
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCCESS,
  COMMENT_UPLOADING_FAILURE,
  COMMENT_UPLOADING_REQUEST,
  COMMENT_UPLOADING_SUCCESS,
} from '../types'
import { push } from 'connected-react-router'

// load comment
const loadCommentsAPI = (payload) => {
  console.log(payload, 'loadCommentsAPI')
  return axios.get(`/api/post/${payload}/comments`)
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.payload)
    console.log('loadComments', result)
    yield put({
      type: COMMENT_LOADING_SUCCESS,
      payload: result.data,
    })
  } catch (e) {
    console.log(e)
    yield put({
      type: COMMENT_LOADING_FAILURE,
      payload: e,
    })
    yield put(push('/'))
  }
}

function* watchLoadComments() {
  yield takeEvery(COMMENT_LOADING_REQUEST, loadComments)
}

// upLoad comment
const upLoadCommentsAPI = (payload) => {
  console.log(payload.id, 'upLoadCommentsAPI')
  return axios.post(`/api/post/${payload.id}/comments`, payload)
}

function* upLoadComments(action) {
  try {
    const result = yield call(upLoadCommentsAPI, action.payload)
    console.log('upLoadComments', result)
    yield put({
      type: COMMENT_UPLOADING_SUCCESS,
      payload: result.data,
    })
  } catch (e) {
    console.log(e)
    yield put({
      type: COMMENT_UPLOADING_FAILURE,
      payload: e,
    })
    yield put(push('/'))
  }
}

function* watchupLoadComments() {
  yield takeEvery(COMMENT_UPLOADING_REQUEST, upLoadComments)
}

export default function* commentSaga() {
  yield all([fork(watchLoadComments), fork(watchupLoadComments)])
}
