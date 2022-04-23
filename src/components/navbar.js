import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './navbar.module.css'
export default class Navbar extends Component {

  render() {
    return (
      <nav className={classes.navbar}>
        <div>
        <Link to="/" className={classes.navbar_brand}>Excersise Tracker</Link>
        </div>
       
        <div className="collpase navbar-collapse">
        <ul >
          <li >
          <Link to="/" className={classes.nav_link}>Exercises</Link>
          </li>
          <li >
          <Link to="/create" className={classes.nav_link}>Create Exercise Log</Link>
          </li>
          <li >
          <Link to="/user" className={classes.nav_link}>Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}