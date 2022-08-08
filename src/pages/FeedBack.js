// import PropTypes from 'prop-types';
import React from 'react';
// import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
      </div>
    );
  }
}

/*
FeedBack.propTypes = {
  assertions: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

*/

export default FeedBack;
