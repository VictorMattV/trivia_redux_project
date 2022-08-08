import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { scoreAction } from '../redux/actions';
import fetchGravatar from '../services/fetchGravatar';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0,
    };
  }

  componentDidMount() {
    const { score } = this.state;
    const { saveScore } = this.props;
    saveScore(score);
  }

  getGravatarImage = (email) => {
    const image = fetchGravatar(email);
    return image;
  }

  render() {
    const { username, email } = this.props;
    const { score } = this.state;
    return (
      <header>
        <img
          src={ this.getGravatarImage(email) }
          alt="header-profile"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{ username }</h3>
        <h3 data-testid="header-score">{score}</h3>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  saveScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.player.name,
  email: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  saveScore: (score) => dispatch(scoreAction(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
