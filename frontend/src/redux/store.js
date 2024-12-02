import { createStore, combineReducers, applyMiddleware } from 'redux';
import { studentReducer, authReducer, adminsReducer } from './reducers';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  students: studentReducer,
  auth: authReducer,
  admins: adminsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
