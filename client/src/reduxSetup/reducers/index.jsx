import { combineReducers } from 'redux';
import mysqlLoginReducer from './mysqlLoginReducer';
import getCommonTablesReducer from './getCommonTablesReducer';
import getTablesReducer from './getTablesReducer';

export default combineReducers({
  mysqlLoginData: mysqlLoginReducer,
  commonTables: getCommonTablesReducer,
  tables: getTablesReducer,
});
