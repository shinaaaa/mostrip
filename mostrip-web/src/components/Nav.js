import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Nav({ isLoggedIn, setIsLoggedIn, setIsAdmin }) {
  const logout = () => {
    //만료시간을 현재시간으로 변경해서 쿠키를 파괴함.
    document.cookie = `Authorization=;expires=${new Date().toUTCString()}`;
    setIsLoggedIn(false);
    setIsAdmin(false);
  };
  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("Authorization"));
  }, []);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      id="mainNav"
    >
      <div className="container">
        <a className="navbar-brand" href="/">
          毛stagram
        </a>
        <button className="navbar-toggler navbar-toggler-right" type="button">
          Menu
          <i className="fas fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <a className="nav-link" onClick={logout}>
                  Logout
                </a>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
