import React from 'react';
import logo from '../trivia.png';

class Header extends React.Component {
  render() {
    return (
      <header>
        <img
          src={ logo }
          alt="header-profile"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">Nome</h3>
        <h3 data-testid="header-score">0</h3>
      </header>
    );
  }
}

export default Header;
