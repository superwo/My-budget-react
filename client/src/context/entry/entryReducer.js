import {
  GET_ENTRIES,
  ADD_ENTRY,
  ENTRY_ERROR,
  DELETE_ENTRY,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ENTRY,
  FILTER_ENTRIES,
  CLEAR_FILTER,
  CLEAR_ENTRIES
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return {
        ...state,
        entries: action.payload,
        loading: false
      };
    case ADD_ENTRY:
      return {
        ...state,
        entries: [action.payload, ...state.entries],
        loading: false
      };
    case UPDATE_ENTRY:
      return {
        ...state,
        entries: state.entries.map(entry =>
          entry._id === action.payload._id ? action.payload : entry
        ),
        loading: false
      };
    case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== action.payload),
        loading: false
      };
    case CLEAR_ENTRIES:
      return {
        ...state,
        entries: null,
        filtered: null,
        error: null,
        current: null
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
    case FILTER_ENTRIES:
      return {
        ...state,
        filtered: state.entries.filter(entry => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return entry.name.match(regex) || entry.category.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case ENTRY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
