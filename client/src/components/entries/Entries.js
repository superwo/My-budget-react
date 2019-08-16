import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import EntryContext from '../../context/entry/entryContext';
import EntryItem from './EntryItem';

const Entries = () => {
  const entryContext = useContext(EntryContext);

  const { entries, filtered } = entryContext;

  if (entries.length === 0) return <h4>No entries</h4>;

  const entriesList = filtered || entries;

  return (
    <Fragment>
      <TransitionGroup>
        {entriesList.map(entry => (
          <CSSTransition key={entry.id} timeout={500} classNames='item'>
            <EntryItem entry={entry} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Entries;
