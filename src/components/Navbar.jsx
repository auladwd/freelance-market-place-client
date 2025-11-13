import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navLinks = (
    <>
      <li>
        <NavLink to="/" end>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allJobs">All Jobs</NavLink>
      </li>
      <li>
        <NavLink to="/addJob">Add a Job</NavLink>
      </li>
      <li>
        <NavLink to="/my-accepted-tasks">My Accepted Tasks</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/myAddedJobs">My Added Jobs</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-base-100 border-b">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="text-xl font-bold">
            Freelance <span className="text-primary">MarketPlace</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">{navLinks}</ul>
        </div>

        <div className="navbar-end gap-3">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName || user.email}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border">
                  <img
                    src={user.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <button onClick={logout} className="btn btn-outline btn-sm">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
