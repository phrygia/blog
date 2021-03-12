import { POSTS_LOADING_FAILURE, POSTS_LOADING_REQUEST, POSTS_LOADING_SUCCESS } from '../types'

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDefault: '',
  postCount: '',
  loading: false,
  error: '',
  creatorId: '',
  categoryFindResult: '',
  title: '',
  serarchBy: '',
  serrchResult: '',
}

const postReducer = function (state = initialState, action) {
  switch (action.type) {
    case POSTS_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      }
    case POSTS_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false,
      }
    case POSTS_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default postReducer
