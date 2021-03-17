import axios from 'axios'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
} from '../types'

// all posts load
const loadPostAPI = () => {
  return axios.get('/api/post')
}

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI)
    // console.log('result : ', result)
    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data,
    })
  } catch (e) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e,
    })
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts)
}

// post upload
const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const token = payload.token
  if (token) {
    config.headers['x-auth-token'] = token
  }
  return axios.post('/api/post', payload, config)
}

function* uploadPosts(action) {
  console.log('uploadPosts action : ', action)
  try {
    const result = yield call(uploadPostAPI, action.payload)
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    })
    yield put(push(`/post/${result.data._id}`))
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e,
    })
    yield put(push('/'))
  }
}

function* watchUploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts)
}

// Post detail
const loadPostDetailAPI = (payload) => {
  return axios.get(`/api/post/${payload}`)
}

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload)
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    })
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e,
    })
    yield put(push('/'))
  }
}

function* watchloadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail)
}

//post delete
const deletePostAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const token = payload.token
  if (token) {
    config.headers['x-auth-token'] = token
  }
  return axios.delete(`/api/post/${payload.id}`, config)
}

function* deletePost(action) {
  try {
    const result = yield call(deletePostAPI, action.payload)
    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data,
    })
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e,
    })
  }
}

function* watchDeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, deletePost)
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts), fork(watchUploadPosts), fork(watchloadPostDetail), fork(watchDeletePost)])
}