import { GET_MYSQL_DATABASE } from '../actions/types';
import axios from 'axios';

export const getMySQLDatabases = () => (dispatch) => {
  axios.get('http://localhost:8000/api/preprocess/mysql').then((res) => {
    dispatch({
      type: GET_MYSQL_DATABASE,
      payload: res.data,
    });
  });
};
