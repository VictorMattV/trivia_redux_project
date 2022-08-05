import PropTypes from 'prop-types';
import React from 'react';
import fetchToken from '../services/fetchToken';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateInputs);
  }

  validateInputs = () => {
    const { email, username } = this.state;
    const minLength = 5;
    if (email.length > minLength && username.length > minLength) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  handleClick = () => {
    const { history } = this.props;
    fetchToken();

    history.push('/game');
  }

  render() {
    const { email, username, isDisabled } = this.state;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <label htmlFor="email">
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="username">
          <input
            type="name"
            data-testid="input-player-name"
            id="username"
            name="username"
            value={ username }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Play
        </button>
      </header>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
