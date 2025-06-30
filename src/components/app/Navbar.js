import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">ACCOUNTING</li>
        <li className="nav-item">NEWS</li>
        <li className="nav-item">SCHEDULER</li>
        <li className="nav-item">PROFILE</li>
      </ul>
    </nav>
  );
}

export default Navbar;
