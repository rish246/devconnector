import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom'
import { Link, Redirect } from 'react-router-dom';
import { loadUser, signOutUser } from '../../slices/auth';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const renderOption = () => {
    if (!isAuthenticated) {
      return (
        <nav className="navbar bg-dark">
          <h1>
            <Link to="/">
              <i className="fas fa-code" /> DevConnector
            </Link>
          </h1>
          <ul>
            <li>
              <Link to="/profiles">Developers</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      );
    }

    return (
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/dashboard">
            <i className="fas fa-code" /> DevConnector
          </Link>
        </h1>
        <ul>
          <li>
            <Link to="/profiles">Developers</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            |
            <Link to="/dashboard" title="Dashboard">
              <i className="fas fa-user" />
              <span className="hide-sm">Dashboard</span>
            </Link>
          </li>
          <li>
            <button
              className="btn btn-light"
              onClick={() => {
                dispatch(signOutUser());
                history.push('/login');
              }}
            >
              <span className="hide-sm">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return <Fragment>{renderOption()}</Fragment>;
};

export default Header;
