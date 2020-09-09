import { GET_COMMON_TABLES } from '../actions/types';

const initialState = {
  commonTables: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMMON_TABLES:
      return {
        ...state,
        commonTables: action.payload,
      };
    default:
      return state;
  }
}
