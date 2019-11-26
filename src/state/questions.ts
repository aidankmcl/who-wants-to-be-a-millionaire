
import { createAction, createAsyncAction, createReducer, ActionType, PayloadAction, getType, Action } from 'typesafe-actions';

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
}

export const initialQuestionsState: IQuestionsState = {
  data: {},
  current: null,
  queue: [],
  loading: false,
  error: null,
}

const TYPE_PREFIX = 'questions/';

/*
 * I'll pretend that I'm requesting from a service and use
 * actions for each step to show how I'd handle the logic
 * if I were.
 */
const requestQuestions = createAsyncAction(
  TYPE_PREFIX + 'RETRIEVE_REQUEST',
  TYPE_PREFIX + 'RETRIEVE_SUCCESS',
  TYPE_PREFIX + 'RETRIEVE_FAILURE',
)<void, Question[], void>();

const nextQuestion = createAction(TYPE_PREFIX + 'NEXT')();

export const questionsActions = {
  requestQuestions,
  nextQuestion,
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
    }
  })
  .handleAction(requestQuestions.failure, (state) => ({
    ...state,
    loading: false,
    error: 'Failed to retrieve questions, please refresh the page.'
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
    }
  });
