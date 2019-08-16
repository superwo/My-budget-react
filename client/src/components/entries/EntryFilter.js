import React, { useContext } from 'react';
import EntryContext from '../../context/entry/entryContext';

const EntryFilter = () => {
  const entryContext = useContext(EntryContext);

  const { filterEntries, clearFilter } = entryContext;

  return (
    <form>
      <input
        type='text'
        placeholder='Filter Entries...'
        onChange={e => {
          e.target.value ? filterEntries(e.target.value) : clearFilter();
        }}
      />
    </form>
  );
};

export default EntryFilter;
