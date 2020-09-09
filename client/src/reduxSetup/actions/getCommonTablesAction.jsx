import { GET_COMMON_TABLES } from '../actions/types';
import axios from 'axios';

export const getCommonTables = () => (dispatch) => {
  axios.get('http://localhost:8000/api/preprocess/selecttables').then((res) => {
    // console.log('action', res.data);
    dispatch({
      type: GET_COMMON_TABLES,
      payload: res.data,
    });
  });
};
