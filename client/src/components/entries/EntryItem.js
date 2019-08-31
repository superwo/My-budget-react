import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import EntryContext from '../../context/entry/entryContext';
import moment from 'moment';

const EntryItem = ({ entry }) => {
  const entryContext = useContext(EntryContext);
  const { deleteEntry, setCurrent, clearCurrent } = entryContext;

  const { _id, name, category, type, amount, createdAt } = entry;

  const onDelete = () => {
    deleteEntry(_id);
    clearCurrent();
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
      <div style={{ fontSize: '12px', color: '#555', fontStyle: 'italic' }}>
        {moment(createdAt).format('ll')}
      </div>
      <ul className='list'>
        <li>
          <i className='fas fa-dollar-sign' /> {amount}
        </li>
        <li>
          <i className='fas fa-archive' /> {category}
        </li>
      </ul>
      <p style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className='btn btn-dark btn-small'
          onClick={() => setCurrent(entry)}
        >
          Edit
        </button>
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
