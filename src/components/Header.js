import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import fetchGravatar from '../services/fetchGravatar';

class Header extends React.Component {
  getGravatarImage = (email) => {
    const image = fetchGravatar(email);
    return image;
  }

  render() {
    const { username, email } = this.props;
    return (
      <header>
        <img
          src={ this.getGravatarImage(email) }
          alt="header-profile"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{ username }</h3>
        <h3 data-testid="header-score">0</h3>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);
