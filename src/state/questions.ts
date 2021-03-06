
import { createAction, createAsyncAction, createReducer, ActionType, Action } from 'typesafe-actions';

import { shuffle } from '../utils/array';

export type Question = {
  id: string;
  text: string; // To have a question with no text, must use empty string
  image?: string; // Link to image
  answers: string[];
  correct: number;
}

type QuestionMap = {
  [questionId: string]: Question
}

export interface IQuestionsState {
  data: QuestionMap;
  current: Question | null;
  queue: string[];
  loading: boolean;
  error: string | null;
  powerups: {
    [K in PowerupName]: PowerupInfo;
  }
}

export type PowerupName = 'removeTwo' | 'addTime';

type PowerupInfo = {
  active: boolean;
  used: boolean;
};

export const initialQuestionsState: IQuestionsState = {
  data: {},
  current: null,
  queue: [],
  loading: false,
  error: null,
  powerups: {
    removeTwo: {
      active: false,
      used: false,
    },
    addTime: {
      active: false,
      used: false,
    },
  }
}

const TYPE_PREFIX = 'questions/';

const requestQuestions = createAsyncAction(
  TYPE_PREFIX + 'RETRIEVE_REQUEST',
  TYPE_PREFIX + 'RETRIEVE_SUCCESS',
  TYPE_PREFIX + 'RETRIEVE_FAILURE',
)<void, Question[], void>();

const nextQuestion = createAction(TYPE_PREFIX + 'NEXT')();

const activatePowerup = createAction(TYPE_PREFIX + 'ACTIVATE_POWERUP')<PowerupName>();

export const questionsActions = {
  requestQuestions,
  nextQuestion,
  activatePowerup,
}

export type QuestionsAction = ActionType<typeof questionsActions>;

export const questionGuard = (action: Action): action is QuestionsAction => {
  return action.type.includes(TYPE_PREFIX)
}

export const questionsReducer = createReducer<IQuestionsState, QuestionsAction>(initialQuestionsState)
  .handleAction(requestQuestions.request, (state) => ({ ...state, loading: true, error: null }))
  .handleAction(requestQuestions.success, (state, action) => {
    // Shuffle the questions as per spec
    const questions = action.payload;

    const data: QuestionMap = {};
    const queue = shuffle(questions.map((question) => {
      data[question.id] = question;
      return question.id;
    }));

    const currentId = queue.shift();
    const current = (currentId && data[currentId])
      ? data[currentId]
      : null;

    return {
      current,
      data,
      queue,
      loading: false,
      error: null,
      powerups: { ...initialQuestionsState.powerups }
    }
  })
  .handleAction(requestQuestions.failure, (state) => ({
    ...state,
    loading: false,
    error: 'Failed to retrieve questions, please refresh the page.'
  }))
  .handleAction(activatePowerup, (state, action) => ({
    ...state,
    powerups: {
      ...state.powerups,
      [action.payload]: {
        active: !state.powerups[action.payload].used,
        used: true,
      },
    },
  }))
  .handleAction(nextQuestion, (state, action) => {
    // Shouldn't be able to skip if still loading
    if (state.loading) return state;

    const remainingQuestions = state.queue;

    const nextId = remainingQuestions.shift();
    const nextQuestion = (nextId && state.data[nextId])
      ? state.data[nextId]
      : null;

    return {
      ...state,
      current: nextQuestion,
      queue: remainingQuestions,
      powerups: {
        removeTwo: {
          active: false,
          used: state.powerups.removeTwo.used,
        },
        addTime: {
          active: false,
          used: state.powerups.addTime.used,
        },
      }
    }
  });
