import { combineReducers } from "redux";
import Posts from './posts';
import auth from './auth';
export  const reducers =combineReducers({Posts,auth});