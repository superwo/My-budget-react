import React, { Fragment, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import EntryContext from '../../context/entry/entryContext';
import EntryItem from './EntryItem';
import Spinner from '../layout/Spinner';

const Entries = ({
  match: {
    params: { month }
  }
}) => {
  const entryContext = useContext(EntryContext);

  const { entries, filtered, getEntries, loading } = entryContext;

  useEffect(() => {
    getEntries(month);
    // eslint-disable-next-line
  }, []);

  if (entries !== null && entries.length === 0 && !loading)
    return <h4>No entries</h4>;

  const entriesList = filtered || entries;
  const entriesLeft = [
    <CSSTransition timeout={500} classNames='item' key='incomes'>
      <h3>Incomes</h3>
    </CSSTransition>
  ];
  const entriesRight = [
    <CSSTransition timeout={500} classNames='item' key='expenses'>
      <h3>Expenses</h3>
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
