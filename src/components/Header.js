import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import fetchGravatar from '../services/fetchGravatar';
import '../styles/Header.css';
import logo from '../trivia.png';

class Header extends React.Component {
    getGravatarImage = (email) => {
      const image = fetchGravatar(email);
      return image;
    }

    render() {
      const { username, email, score } = this.props;
      return (
        <header className="Header">
          <img src={ logo } className="Header-logo" alt="logo" />
          <section className="Header-player">
            <img
              src={ this.getGravatarImage(email) }
              alt="header-profile"
              data-testid="header-profile-picture"
              className="Header-img-profile"
            />
            <div className="Header-text">
              <h3 data-testid="header-player-name">{ `Player: ${username}` }</h3>
              <h3 data-testid="header-score">{ `Score: ${score}` }</h3>
            </div>
          </section>

        </header>
      );
    }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Header);
