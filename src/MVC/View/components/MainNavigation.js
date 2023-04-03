import                        "../../../css/menu.css";
import                        "../../../css/style.css";
import                        "../../../css/MainNavigation.css";
import { Link }          from "react-router-dom";
import React, { useRef } from "react";

const MainNavigation = () => {
  const inputRef     = useRef();

  return (
    <React.Fragment>
      <div className="menu-wrap">
        <input ref={inputRef} type="checkbox" className="toggler" />
        <div className="hamburger">
          <div />
        </div>
        <div className="menu">
          <div>
            <div>
              <ul className="flex-container">
                <li onClick={() => (inputRef.current.checked = false)}>
                  <Link to="/">Home</Link>
                </li>
                <li onClick={() => (inputRef.current.checked = false)}>
                  <Link to="/add">Add Item</Link>
                </li>
                <li onClick={() => (inputRef.current.checked = false)}>
                  <Link to="/edit">Edit Item</Link>
                </li>
                <li onClick={() => (inputRef.current.checked = false)}>
                  <Link to="/delete">Delete Item</Link>
                </li>
                <li onClick={() => (inputRef.current.checked = false)}>
                  <Link to="/search">Search Item</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <nav className="fullscreen-navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Item</Link>
          </li>
          <li>
            <Link to="/edit">Edit Item</Link>
          </li>
          <li>
            <Link to="/delete">Delete Item</Link>
          </li>
          <li>
            <Link to="/search">Search Item</Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default MainNavigation;
