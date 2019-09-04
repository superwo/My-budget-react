import React, { Fragment, useContext, useEffect } from 'react';
import moment from 'moment';
import Entries from '../../entries/Entries';
import AuthContext from '../../../context/auth/authContext';
import EntryContext from '../../../context/entry/entryContext';
import EntryForm from '../../entries/EntryForm';
import EntryFilter from '../../entries/EntryFilter';
import Calendar from 'react-calendar';

const Home = ({
  history,
  match: {
    params: { year, month }
  }
}) => {
  const authContext = useContext(AuthContext);
  const entryContext = useContext(EntryContext);
  const { selectedDate, changeSelectedDate } = entryContext;

  useEffect(() => {
    authContext.loadUser();
    if (year && month) {
      const theDate = new Date(`${year}/${month}/1`);
      changeSelectedDate(theDate);
    }

    // eslint-disable-next-line
  }, []);

  const onChange = date => {
    // changeSelectedDate(date);
    // const d = moment(date).format('YYYY/MMMM');
    // history.push(`/${d}`);
  };

  const onActiveDateChange = ({ activeStartDate, view }) => {
    const d = moment(activeStartDate).format('YYYY/MMMM');
    changeSelectedDate(activeStartDate);
    history.push(`/${d}`);
  };

  const onClickMonth = value => {
    const d = moment(value).format('YYYY/MMMM');
    changeSelectedDate(value);
    history.push(`/${d}`);
  };

  return (
    <Fragment>
      <EntryFilter />
      <div className='grid-3-2'>
        <div>
          <Calendar
            minDetail='year'
            maxDetail='year'
            onClickMonth={onClickMonth}
            onActiveDateChange={onActiveDateChange}
            value={selectedDate}
            onChange={onChange}
            showNavigation={false}
          />
          <EntryForm />
        </div>
        <Entries />
      </div>
    </Fragment>
  );
};

export default Home;
