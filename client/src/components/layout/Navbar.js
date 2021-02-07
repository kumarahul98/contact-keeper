import React, { Fragment } from "react";
import { RiContactsLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const navbar = () => {
  return (
    <Fragment>
      <nav
        class="navbar navbar-expand-lg navbar-light bg-primary"
        
      >
        <a class="navbar-brand" style={{ color: "white" }} href="/">
          <RiContactsLine />
          ContactKeeper
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
        >
          <span class="navbar-toggler-icon">test</span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <NavLink
                exact
                activeClassName=" shadow-lg bg-white btn btn-primary rounded activeItem"
                disabled
                className="nav-link"
                to="/"
              >
                Home <span class="sr-only">(current)</span>
              </NavLink>
            </li>
            <li class="nav-item active">
              <NavLink
                exact
                activeClassName="shadow-lg bg-white btn btn-primary rounded activeItem"
                disabled
                className="nav-link"
                to="/about"
              >
                About
              </NavLink>
            </li>
            {/* <li class="nav-item">
        <NavLink class="nav-link" href="#">Pricing</NavLink>
      </li> */}
          </ul>
          {/* <span class="navbar-text">
      Navbar text with an inline element
    </span> */}
        </div>
      </nav>
    </Fragment>
  );
};

export default navbar;
