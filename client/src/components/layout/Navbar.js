import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import EntryContext from '../../context/entry/entryContext';

const Navbar = props => {
  const { title, icon, location } = props;
  const authContext = useContext(AuthContext);
  const entryContext = useContext(EntryContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearEntries } = entryContext;

  const onLogout = () => {
    logout();
    clearEntries();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  const monthAndYear = () => {
    const date = new Date();
    let month = location.pathname.replace('/', '');
    const months = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december'
    ];
    month = month ? month : months[date.getMonth()];
    return (
      <span>
        {month[0].toUpperCase() + month.substr(1)} {date.getFullYear()}
      </span>
    );
  };

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <div>{monthAndYear()}</div>
      <ul>
        <li>
          <Link to='/about'>About</Link>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'My Budget',
  icon: 'fas fa-wallet'
};

export default withRouter(Navbar);
