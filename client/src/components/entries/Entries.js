import React, { Fragment, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import EntryContext from '../../context/entry/entryContext';
import EntryItem from './EntryItem';
import Spinner from '../layout/Spinner';

const Entries = ({
  match: {
    params: { year, month }
  }
}) => {
  const entryContext = useContext(EntryContext);

  const {
    entries,
    filtered,
    getEntries,
    loading,
    selectedDate,
    getSumEntries,
    sumEntries
  } = entryContext;

  useEffect(() => {
    getSumEntries();
    // eslint-disable-next-line
  }, [entries]);
  useEffect(() => {
    getEntries(year, month);
    // eslint-disable-next-line
  }, [selectedDate]);

  if (entries !== null && entries.length === 0 && !loading)
    return <h4 className='text-center'>No entries</h4>;

  const entriesList = filtered || entries;
  const entriesLeft = [
    <CSSTransition timeout={500} classNames='item' key='incomes'>
      <h3 className='text-success'>Incomes: ${sumEntries[0]}</h3>
    </CSSTransition>
  ];
  const entriesRight = [
    <CSSTransition timeout={500} classNames='item' key='expenses'>
      <h3 className='text-danger'>Expenses: ${sumEntries[1]}</h3>
    </CSSTransition>
  ];
  if (entries !== null) {
    entriesList.forEach(entry => {
      if (entry.type === 'income') {
        entriesLeft.push(
          <CSSTransition timeout={500} classNames='item' key={entry._id}>
            <EntryItem entry={entry} />
          </CSSTransition>
        );
      } else {
        entriesRight.push(
          <CSSTransition timeout={500} classNames='item' key={entry._id}>
            <EntryItem entry={entry} />
          </CSSTransition>
        );
      }
    });
  }

  return (
    <Fragment>
      {entries !== null && !loading ? (
        <Fragment>
          <TransitionGroup>{entriesLeft}</TransitionGroup>
          <TransitionGroup>{entriesRight}</TransitionGroup>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default withRouter(Entries);
