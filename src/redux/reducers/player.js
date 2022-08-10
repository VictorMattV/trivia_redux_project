import { SUM_ASSERTION, UPDATE_SCORE, USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case USER_LOGIN:
    return {
      ...state,
      name: payload.username,
      gravatarEmail: payload.email,
      score: 0 };

  case UPDATE_SCORE:
    return {
      ...state,
      score: payload,
    };

  case SUM_ASSERTION:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
