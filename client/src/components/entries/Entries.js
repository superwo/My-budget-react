import React, { Fragment, useContext } from 'react';
import EntryContext from '../../context/entry/entryContext';
import EntryItem from './EntryItem';

const Entries = () => {
  const entryContext = useContext(EntryContext);

  const { entries } = entryContext;

  return (
    <Fragment>
      {entries.map(entry => (
        <EntryItem key={entry.id} entry={entry} />
      ))}
    </Fragment>
  );
};

export default Entries;
