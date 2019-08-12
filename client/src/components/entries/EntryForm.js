import React, { useState, useContext } from 'react';
import EntryContext from '../../context/entry/entryContext';

const EntryForm = () => {
  const entryContext = useContext(EntryContext);

  const [entry, setEntry] = useState({
    name: '',
    category: '',
    amount: '',
    type: 'expense'
  });

  const { name, category, amount, type } = entry;

  const onChange = e => setEntry({ ...entry, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    entryContext.addEntry(entry);
    setEntry({
      name: '',
      category: '',
      amount: '',
      type: 'expense'
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add Entry</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Category'
        name='category'
        value={category}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Amount'
        name='amount'
        value={amount}
        onChange={onChange}
      />
      <h5>Entry type</h5>
      <input
        type='radio'
        name='type'
        value='expense'
        checked={type === 'expense'}
        onChange={onChange}
      />{' '}
      Expense{' '}
      <input
        type='radio'
        name='type'
        value='income'
        checked={type === 'income'}
        onChange={onChange}
      />{' '}
      Income
      <div>
        <input
          type='submit'
          value='Add Entry'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

export default EntryForm;
