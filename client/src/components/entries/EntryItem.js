import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import EntryContext from '../../context/entry/entryContext';

const EntryItem = ({ entry }) => {
  const entryContext = useContext(EntryContext);
  const { deleteEntry } = entryContext;

  const { id, name, category, type, amount } = entry;

  const onDelete = () => {
    deleteEntry(id);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'income' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        <li>
          <i className='fas fa-dollar-sign' /> {amount}
        </li>
        <li>
          <i className='fas fa-archive' /> {category}
        </li>
      </ul>
      <p>
        <button className='btn btn-dark btn-small'>Edit</button>
        <button className='btn btn-danger btn-small' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

EntryItem.propTypes = {
  entry: PropTypes.object.isRequired
};

export default EntryItem;
