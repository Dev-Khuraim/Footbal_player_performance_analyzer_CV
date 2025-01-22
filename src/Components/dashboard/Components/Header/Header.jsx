import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
const Header = ({home, setHome, setimageData, setenableField, setisLoading, setplayerData}) => {
  function handleClick(){
    setimageData(false);
    setisLoading(false);
    setHome(true);
    setenableField(false);
    setplayerData(null);
  }
  return (
    <header className="header">
      <div className="logo">
      
        <h1>Football Player Analyzer</h1>
      </div>
      <nav className="navigation">
        <ul>
          <li onClick={handleClick}><a >Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <Link className='ml-5' to='/'>Logout</Link>
          {/* Add more navigation links as needed */}
        </ul>
        
      </nav>
    </header>
  );
};

export default Header;
