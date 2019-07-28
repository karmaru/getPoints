import {createStore, applyMiddleware, compose} from 'redux'
import authReducer from './redux/auth_reducer';
const loggingMiddleware = (store) => (next) => (action) => {
  // Our middleware
  console.log(`Redux Log:`, action)
  // call the next function
  next(action);
}






const enhancer = compose(
  applyMiddleware(loggingMiddleware),
  // other store enhancers if any,
  window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__({
    name: 'getPoints State', actionsBlacklist: ['REDUX_STORAGE_SAVE']
  }) : noop => noop
);
const store = createStore(authReducer, enhancer);

export default store;