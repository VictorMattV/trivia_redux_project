import { USER_LOGIN, USER_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case USER_LOGIN:
    return { ...state, name: payload.username, gravatarEmail: payload.email };
  case USER_SCORE:
    return { ...state, score: payload.score };
  default:
    return state;
  }
};

export default player;
