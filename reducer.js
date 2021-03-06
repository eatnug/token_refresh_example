import Axios from 'axios';
import { Alert } from 'react-native';
import {put, call, takeLatest, all, select} from 'redux-saga/effects';

const FETCH_SUCCESS_URL = 'https://5f6daab160cf97001641b1de.mockapi.io/fetchSuccess';
const FETCH_FAIL_URL = 'https://5f6daab160cf97001641b1de.mockapi.io/fetchFail';
const LOGIN_URL = 'https://5f6daab160cf97001641b1de.mockapi.io/login';
const USERNAME = 'username';
const PASSWORD = 'password';

const ADD_DATA = 'ADD_DATA';
const SET_TOKEN = 'SET_TOKE';
const AUTH = 'AUTH';
const FETCH = 'FETCH';

export const fetch = () => {
  return {
    type: FETCH,
  };
};
export const addData = (data) => ({
  type: ADD_DATA,
  payload: {data},
});

export const auth = () => ({
  type: AUTH
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: {
    token,
  },
});

const initialState = {
  data: [],
  token: 'initialToken',
};

export const rootReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };
    case SET_TOKEN:
      const token = action.payload.token;
      return {
        ...state,
        token,
      };
    default:
      return state;
  }
};

const fetchApi = (token) =>{
    if (token==='valid') return Axios.get(FETCH_SUCCESS_URL);
    return Axios.get(FETCH_FAIL_URL);
}

function* fetchGenertaor() {
  try {
    const {token} = yield select(store => store.root)
    console.log(token)
    const response = yield call(fetchApi, token);
    const {result, data, error} = response.data;
    if (result) yield put(addData(data))
    else throw new Error(error)
  } catch (error) {
    Alert.alert(error.message)
  }
}


const authApi = ({username, password}) =>
  Axios.post(LOGIN_URL, {
    username,
    password,
  });

function* authGenerator({username, password}) {
  try {
    const response = yield call(authApi, {username, password});
    const {result, token} = response.data;
    if (result) yield put(setToken(token));
    else throw Error('Error getting token')
  } catch (error) {
    Alert.alert(error.message)
  }
}


export function* rootSaga() {
    yield takeLatest(AUTH, authGenerator, {username: USERNAME, password: PASSWORD});
    yield takeLatest(FETCH, fetchGenertaor);
}

// const sagaMiddleWare = createSagaMiddleWare()

// export const store = createStore(combineReducers({root:rootReducer}), applyMiddleware(sagaMiddleWare))

// sagaMiddleWare.run(rootSaga)
