import { combineReducers } from 'redux';
import mysqlLoginReducer from './mysqlLoginReducer';
import getCommonTablesReducer from './getCommonTablesReducer';

export default combineReducers({
  mysqlLoginData: mysqlLoginReducer,
  commonTables: getCommonTablesReducer,
});
