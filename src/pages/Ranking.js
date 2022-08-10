import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import fetchGravatar from '../services/fetchGravatar';

class Ranking extends React.Component {
  state = {
    userRanking: [],
  }

  componentDidMount() {
    this.userRankingSort();
  }

  getGravatarImage = (email) => {
    const image = fetchGravatar(email);
    return image;
  }

  userRankingSort = () => {
    const userRanking = JSON.parse(localStorage.getItem('userRanking'));
    if (userRanking) {
      userRanking.sort((a, b) => b.score - a.score);
      this.setState({ userRanking });
    }
  }

  render() {
    const { history } = this.props;
    const { userRanking } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Go Home
        </button>
        {userRanking.length
          ? (userRanking.map((user, index) => (
            <div key={ index }>
              <img
                src={ this.getGravatarImage(user.email) }
                alt="header-profile"
                data-testid="header-profile-picture"
              />
              <h3 data-testid={ `player-name-${index}` }>{user.username}</h3>
              <h3 data-testid={ `player-score-${index}` }>{user.score}</h3>
            </div>
          )))
          : <p>não há Ranking</p>}
      </>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  username: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Ranking);
