import React from 'react';
import './Header.css';

function Header() {
  return (
    <header>
      <a
        href='https://viaplay.se/'
        target='_blank'
        rel='noreferrer'
        tabIndex='0'
      >
        <img
          src='https://viaplay-web-frontend-assets.mtg-api.com/frontend-2021102640357/images/header-logo-large.png'
          alt='Viaplay Logo'
        />
      </a>
    </header>
  );
}

export default Header;
