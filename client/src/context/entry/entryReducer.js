import {
  ADD_ENTRY,
  DELETE_ENTRY,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ENTRY,
  FILTER_ENTRIES,
  CLEAR_FILTER
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };
    case UPDATE_ENTRY:
      return {
        ...state,
        entries: state.entries.map(entry =>
          entry.id === action.payload.id ? action.payload : entry
        )
      };
    case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter(entry => entry.id !== action.payload)
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
};
