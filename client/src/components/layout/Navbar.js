import React, { Fragment, useContext } from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext); //authContext lets us get the data from AuthState

  const { isAuthenticated, logout, user } = authContext;
  const onLogout = () => {
    logout();
  };
  const authLinks = (
    <Fragment>
      {/* If theres a username say hello */}
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          {" "}
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>{" "}
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="register"> Register </Link>
      </li>
      <li>
        <Link to="login"> Login </Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <ul>
        {/* If we are uthenticated, render authlinks, otherwise */}
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
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt"
};

export default Navbar;
