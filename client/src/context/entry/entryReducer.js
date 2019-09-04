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
  CLEAR_ENTRIES,
  CHANGE_SELECTED_DATE,
  GET_SUM_ENTRIES
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
        sumEntries: [],
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
      console.log(action.payload);
      return {
        ...state,
        error: action.payload
      };
    case CHANGE_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload
      };
    case GET_SUM_ENTRIES:
      let sum = [];
      if (state.entries) {
        sum = state.entries.reduce(
          (acc, curr) => {
            if (curr.type === 'income') {
              acc[0] = acc[0] + curr.amount;
            } else {
              acc[1] = acc[1] + curr.amount;
            }
            return acc;
          },
          [0, 0]
        );
      }
      return {
        ...state,
        sumEntries: sum
      };
    default:
      return state;
  }
};
