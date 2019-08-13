import React, { useReducer } from 'react';
import uuid from 'uuid';
import EntryContext from './entryContext';
import entryReducer from './entryReducer';
import {
  ADD_ENTRY,
  DELETE_ENTRY,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ENTRY,
  FILTER_ENTRIES,
  CLEAR_FILTER
} from '../types';

const EntryState = props => {
  const initialState = {
    entries: [
      {
        id: 1,
        name: 'Buy a car',
        category: 'Vehicle',
        type: 'expense',
        amount: 7850
      },
      {
        id: 2,
        name: 'Go to Italy',
        category: 'Holliday',
        type: 'expense',
        amount: 2000
      },
      {
        id: 3,
        name: 'Money for my job',
        category: 'Work',
        type: 'income',
        amount: 1500
      }
    ],
    current: null
  };

  const [state, dispatch] = useReducer(entryReducer, initialState);

  // Add Entry
  const addEntry = entry => {
    entry.id = uuid.v4();
    dispatch({ type: ADD_ENTRY, payload: entry });
  };

  // Delete Entry
  const deleteEntry = id => {
    dispatch({ type: DELETE_ENTRY, payload: id });
  };

  // Set Current Entry
  const setCurrent = entry => {
    dispatch({ type: SET_CURRENT, payload: entry });
  };

  // Clear Current Entry
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Entry
  const updateEntry = entry => {
    dispatch({ type: UPDATE_ENTRY, payload: entry });
  };

  // Filter Entries

  // Clear Filter

  return (
    <EntryContext.Provider
      value={{
        entries: state.entries,
        current: state.current,
        addEntry,
        deleteEntry,
        setCurrent,
        clearCurrent,
        updateEntry
      }}
    >
      {props.children}
    </EntryContext.Provider>
  );
};

export default EntryState;
