import { REQUEST_QUESTIONS,
  RECEIVE_QUESTIONS,
  RECEIVE_QUESTIONS_ERROR,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  logout: false,
};

const game = (state = INITIAL_STATE, action) => {
  const { questions, type } = action;
  switch (type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      loading: true,
      score: 0,
    };

  case RECEIVE_QUESTIONS:
    return {
      ...state,
      loading: false,
      questions,
    };

  case RECEIVE_QUESTIONS_ERROR:
    return {
      ...state,
      logout: true,
    };

  default:
    return state;
  }
};

export default game;
