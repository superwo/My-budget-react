import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import EntryContext from '../../context/entry/entryContext';

const EntryForm = ({ history }) => {
  const entryContext = useContext(EntryContext);
  const { addEntry, updateEntry, current, clearCurrent } = entryContext;

  useEffect(() => {
    if (current !== null) {
      setEntry(current);
    } else {
      setEntry({
        name: '',
        category: '',
        amount: '',
        type: 'expense'
      });
    }
  }, [entryContext, current]);

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

    if (current === null) {
      addEntry(entry);
      history.push('/');
    } else {
      updateEntry(entry);
    }

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Entry' : 'Add Entry'}</h2>
      <input
        type='text'
        placeholder='Description'
        required
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Category'
        required
        name='category'
        value={category}
        onChange={onChange}
      />
      <input
        type='text'
        required
        pattern='^\$?(?!0.00)(([0-9]{1,5},([0-9]{3},)*)[0-9]{3}|[0-9]{1,5})(\.[0-9]{2})?$'
        placeholder='$100.00'
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
          value={current ? 'Update Entry' : 'Add Entry'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default withRouter(EntryForm);
