import { GET_MYSQL_DATABASE } from '../actions/types';

const initialState = {
  databases: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MYSQL_DATABASE:
      return {
        ...state,
        databases: action.payload,
      };
    default:
      return state;
  }
}
