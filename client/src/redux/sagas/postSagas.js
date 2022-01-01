import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  CATEGORY_FIND_FAILURE,
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCCESS,
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_LOADING_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
} from '../types';

// all posts load
const loadPostAPI = payload => {
  return axios.get(`/api/post/skip/${payload}`);
};

function* loadPosts(action) {
  try {
    const result = yield call(loadPostAPI, action.payload);
    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}

// post upload
const uploadPostAPI = payload => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.post('/api/post', payload, config);
};

function* uploadPosts(action) {
  console.log('uploadPosts action : ', action);
  try {
    const result = yield call(uploadPostAPI, action.payload);
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchUploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

// Post detail
const loadPostDetailAPI = payload => {
  return axios.get(`/api/post/${payload}`);
};

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchloadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

//post delete
const deletePostAPI = payload => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.delete(`/api/post/${payload.id}`, config);
};

function* deletePost(action) {
  try {
    const result = yield call(deletePostAPI, action.payload);
    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data,
    });
    yield put(push('/'));
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchDeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, deletePost);
}

//post edit load
const postEditLoadAPI = payload => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.get1(`/api/post/${payload.id}/edit`, config);
};

function* postEditLoad(action) {
  try {
    const result = yield call(postEditLoadAPI, action.payload);
    yield put({
      type: POST_EDIT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_EDIT_LOADING_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchEditPostLoad() {
  yield takeEvery(POST_EDIT_LOADING_REQUEST, postEditLoad);
}

//post edit upload
const postEditUpLoadAPI = payload => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.post(`/api/post/${payload.id}/edit`, payload, config);
};

function* postEditUpLoad(action) {
  try {
    const result = yield call(postEditUpLoadAPI, action.payload);
    console.log(result);
    yield put({
      type: POST_EDIT_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_EDIT_UPLOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchEditPostUpLoad() {
  yield takeEvery(POST_EDIT_UPLOADING_REQUEST, postEditUpLoad);
}

// Category Find
const CategoryFindAPI = payload => {
  return axios.get(`/api/post/category/${encodeURIComponent(payload)}`);
};

function* CategoryFind(action) {
  try {
    const result = yield call(CategoryFindAPI, action.payload);
    yield put({
      type: CATEGORY_FIND_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: CATEGORY_FIND_FAILURE,
      payload: e,
    });
  }
}

function* watchCategoryFind() {
  yield takeEvery(CATEGORY_FIND_REQUEST, CategoryFind);
}

// Search Result
const searchResultAPI = payload => {
  return axios.get(`/api/search/${encodeURIComponent(payload)}`);
};

function* searchResult(action) {
  try {
    const result = yield call(searchResultAPI, action.payload);
    // console.log(result)
    yield put({
      type: SEARCH_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/search/${encodeURIComponent(action.payload)}`));
  } catch (e) {
    yield put({
      type: SEARCH_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchSearchResult() {
  yield takeEvery(SEARCH_REQUEST, searchResult);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchUploadPosts),
    fork(watchloadPostDetail),
    fork(watchDeletePost),
    fork(watchEditPostLoad),
    fork(watchEditPostUpLoad),
    fork(watchCategoryFind),
    fork(watchSearchResult),
  ]);
}
