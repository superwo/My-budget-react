import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import EntryContext from '../../context/entry/entryContext';
import EntryItem from './EntryItem';
import Spinner from '../layout/Spinner';

const Entries = () => {
  const entryContext = useContext(EntryContext);

  const { entries, filtered, getEntries, loading } = entryContext;

  useEffect(() => {
    getEntries();
    // eslint-disable-next-line
  }, []);

  if (entries !== null && entries.length === 0 && !loading)
    return <h4>No entries</h4>;

  const entriesList = filtered || entries;

  return (
    <Fragment>
      {entries !== null && !loading ? (
        <TransitionGroup>
          {entriesList.map(entry => (
            <CSSTransition key={entry._id} timeout={500} classNames='item'>
              <EntryItem entry={entry} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Entries;
