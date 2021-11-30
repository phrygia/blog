# react-blog (MERN stack)

## 🛠 사용기술

- React (CRA)
- 스타일링 : material-ui + styled-components
- 상태관리 : redux + redux-saga

## 🔨 Redux, Redux-saga

```js
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './redux/reducers/index'
import rootSaga from './redux/sagas'

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const initialState = {}

const middlewares = [sagaMiddleware, routerMiddleware(history)]
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhancer = process.env.NODE_ENV === 'production' ? compose : devtools || compose

const store = createStore(createRootReducer(history), initialState, composeEnhancer(applyMiddleware(...middlewares)))
sagaMiddleware.run(rootSaga)

export default store

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MyRouter />
      </ConnectedRouter>
    </Provider>
  )
}
```

## ⛑ Structure

```
src
├── assets
├────── css
├────── img
├────── style
├── components
├────── auth
├────── comments
├────── editor
├────── post
├────── search
├────── AdminInfo.js
├────── Footer.js
├────── Header.js
├────── Member.js
├────── Spinner.js
├── redux
├────── reducers
├────── sagas
├────── types.js
├── routes
├────── normalRoute
├────── protectedRoute
├────── Router.js
├── App.js
├── index.js
└── store.js
```

## 📦 Packages

### Main

- [create-react-app](https://github.com/facebook/create-react-app)
- [react 16.0.1](https://github.com/facebook/react)
- [react-router 5.2.0](https://github.com/remix-run/react-router)

### styling

- [material UI](https://github.com/mui-org/material-ui)
- [styled-components](https://github.com/styled-components/styled-components)

### Development Setting

- [eslint](https://github.com/eslint/eslint)
- [prettier](https://github.com/prettier/prettier))

> [More Details](./pacakge.json)

<div align="center">
<sub><sup>Project by <a href="https://github.com/phrygia">phrygia</a></sup></sub><small></small>
</div>
