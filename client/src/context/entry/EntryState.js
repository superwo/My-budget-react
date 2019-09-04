import React, { useReducer } from 'react';
import axios from 'axios';
import EntryContext from './entryContext';
import entryReducer from './entryReducer';
import {
  GET_ENTRIES,
  ADD_ENTRY,
  ENTRY_ERROR,
  DELETE_ENTRY,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_ENTRIES,
  UPDATE_ENTRY,
  FILTER_ENTRIES,
  CLEAR_FILTER
} from '../types';

const EntryState = props => {
  const initialState = {
    entries: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(entryReducer, initialState);

  // Get Entries
  const getEntries = async month => {
    try {
      const res = await axios.get(`/api/entries/${month ? month : ''}`);
      console.log(month);
      dispatch({
        type: GET_ENTRIES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ENTRY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Entry
  const addEntry = async entry => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/entries', entry, config);

      dispatch({ type: ADD_ENTRY, payload: res.data });
    } catch (err) {
      // console.log(err.response.data);
      dispatch({ type: ENTRY_ERROR, payload: err.response.msg });
    }
  };

  // Delete Entry
  const deleteEntry = async id => {
    try {
      await axios.delete(`/api/entries/${id}`);
      dispatch({ type: DELETE_ENTRY, payload: id });
    } catch (err) {
      dispatch({
        type: ENTRY_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Entry
  const updateEntry = async entry => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/entries/${entry._id}`, entry, config);

      dispatch({ type: UPDATE_ENTRY, payload: res.data });
    } catch (err) {
      dispatch({ type: ENTRY_ERROR, payload: err.response.msg });
    }
  };

  // Clear Entries
  const clearEntries = () => {
    dispatch({ type: CLEAR_ENTRIES });
  };

  // Set Current Entry
  const setCurrent = entry => {
    dispatch({ type: SET_CURRENT, payload: entry });
  };

  // Clear Current Entry
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Entries
  const filterEntries = text => {
    dispatch({ type: FILTER_ENTRIES, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <EntryContext.Provider
      value={{
        entries: state.entries,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getEntries,
        addEntry,
        deleteEntry,
        setCurrent,
        clearCurrent,
        updateEntry,
        filterEntries,
        clearFilter,
        clearEntries
      }}
    >
      {props.children}
    </EntryContext.Provider>
  );
};

export default EntryState;
