import { all, fork } from 'redux-saga/effects'
import axios from 'axios'

import authSage from './authSagas'

import dotenv from 'dotenv'
import postSaga from './postSagas'
dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL

export default function* rootSaga() {
    yield all([
        fork(authSage), 
        fork(postSaga)
    ])
}