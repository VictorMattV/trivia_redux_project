import { UPDATE_SCORE, USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case USER_LOGIN:
    return { ...state, name: payload.username, gravatarEmail: payload.email };

  case UPDATE_SCORE:
    return {
      ...state,
      score: payload,
    };

  default:
    return state;
  }
};

export default player;
