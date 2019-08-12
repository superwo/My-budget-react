import React from 'react';
import Entries from '../../entries/Entries';
import EntryForm from '../../entries/EntryForm';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <EntryForm />
      </div>
      <div>
        <Entries />
      </div>
    </div>
  );
};

export default Home;
