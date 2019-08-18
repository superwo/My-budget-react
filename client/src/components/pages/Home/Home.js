import React, { useContext, useEffect } from 'react';
import Entries from '../../entries/Entries';
import EntryForm from '../../entries/EntryForm';
import EntryFilter from '../../entries/EntryFilter';
import AuthContext from '../../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();

    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <EntryForm />
      </div>
      <div>
        <EntryFilter />
        <Entries />
      </div>
    </div>
  );
};

export default Home;
