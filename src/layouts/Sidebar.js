import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <a className="nav-link" href="index.html">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </a>
              {/* interface */}
              <div className="sb-sidenav-menu-heading">Interface</div>
              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseUsers"
                aria-expanded="false"
                aria-controls="collapseUsers"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-user"></i>
                </div>
                Users
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                className="collapse"
                id="collapseUsers"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link to="/user/add" className="nav-link">
                    Add User
                  </Link>
                  <Link to="/users" className="nav-link">
                    Users List
                  </Link>
                </nav>
              </div>
              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePosts"
                aria-expanded="false"
                aria-controls="collapsePosts"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-columns"></i>
                </div>
                Posts
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                className="collapse"
                id="collapsePosts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link to="/posts" className="nav-link">
                    Add Post
                  </Link>
                  <Link to="/posts" className="nav-link">
                    Posts List
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            Start Bootstrap
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
