import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import fetchGravatar from '../services/fetchGravatar';
import '../styles/Ranking.css';

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
      <div className="rankingPage">
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Go Home
        </button>
        <div className="rankingContainer">
          {userRanking.length
            ? (userRanking.map((user, index) => (
              <div key={ index } className="playerRankConteiner">
                <div className="playerRank">
                  <h4>{index + 1}</h4>
                  <div className="playerRankInfo">
                    <img
                      src={ this.getGravatarImage(user.email) }
                      alt="header-profile"
                      data-testid="header-profile-picture"
                    />
                    <h3 data-testid={ `player-name-${index}` }>{user.username}</h3>
                    <h3 data-testid={ `player-score-${index}` }>{user.score}</h3>
                  </div>
                </div>
              </div>
            )))
            : <p>não há Ranking</p>}
        </div>
      </div>

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
