import React, { Fragment, useState, useContext, useEffect } from 'react';
import Entries from '../../entries/Entries';
import AuthContext from '../../../context/auth/authContext';
import EntryForm from '../../entries/EntryForm';
import EntryFilter from '../../entries/EntryFilter';
import Calendar from 'react-calendar';

const Home = () => {
  const [date, setDate] = useState(new Date());

  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();

    // eslint-disable-next-line
  }, []);

  const onChange = date => setDate(date);

  return (
    <Fragment>
      <EntryFilter />
      <div className='grid-3-2'>
        <div>
          <Calendar value={date} onChange={onChange} />
          <EntryForm />
        </div>
        <Entries />
      </div>
    </Fragment>
  );
};

export default Home;
