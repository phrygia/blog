import store from '../../store';
import { USER_LOADING_REQUEST } from '../../redux/types';

function LoadUser() {
  try {
    store.dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem('token'),
    });
  } catch (e) {
    console.error(e);
  }
}

export default LoadUser;
