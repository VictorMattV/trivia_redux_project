import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import fetchGravatar from '../services/fetchGravatar';

class Header extends React.Component {
  // componentDidMount() {
  //   const { username, email } = this.props;
  //   localStorage.setItem(
  //     'obj', `{username: ${username},
  //     img: ${this.getGravatarImage(email)}}`,
  //   );
  // }

    getGravatarImage = (email) => {
      const image = fetchGravatar(email);
      return image;
    }

    render() {
      const { username, email, score } = this.props;
      return (
        <header>
          <img
            src={ this.getGravatarImage(email) }
            alt="header-profile"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{ username }</h3>
          <h3 data-testid="header-score">{ score }</h3>
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
