import { GET_TABLES } from '../actions/types';
import axios from 'axios';

export const getColumnsActions = () => (dispatch) => {
  axios
    .get('http://localhost:8000/api/preprocess/choosecolumns')
    .then((res) => {
      dispatch({
        type: GET_TABLES,
        payload: res.data,
      });
    });
};
