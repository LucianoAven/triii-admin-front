import {NavLink} from "react-router-dom";
import React from "react";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
// import {auth} from './firebase' 


const MainNav = (props) => (
  
  <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Home
    </NavLink>
    <NavLink
      to="/clients"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Clientes
    </NavLink>
    <NavLink
      to="/newClient"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Alta Cliente
    </NavLink>
    <NavLink to="/login" className="nav-link">
      { props.firebaseUser === null && (
          <LoginButton></LoginButton>
        
      )}
      { props.firebaseUser !== null && (
          <LogoutButton />
        
      )}
    </NavLink>
    <div className="navbar-nav ml-auto"></div>
  </div>
);

export default MainNav;
