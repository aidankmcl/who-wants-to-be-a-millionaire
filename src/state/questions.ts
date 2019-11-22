
import { createAction, createAsyncAction, createReducer, ActionType } from 'typesafe-actions';

import { shuffle } from '../utils/array';

export type Question = {
  id: string;
  text: string; // To have a question with no text, must use empty string
  image?: string; // Link to image
  answers: string[];
  correct: number;
}

export interface IQuestionsState {
  list: Question[];
  current: Question | null;
  loading: boolean;
  error: string | null;
}

export const initialQuestionsState = {
  list: [],
  current: null,
  loading: false,
  error: null,
}

/*
 * I'll pretend that I'm requesting from a service and use
 * actions for each step to show how I'd handle the logic
 * if I were.
 */
const requestQuestions = createAsyncAction(
  'questions/RETRIEVE_REQUEST',
  'questions/RETRIEVE_SUCCESS',
  'questions/RETRIEVE_FAILURE',
)<void, Question[], void>();

const nextQuestion = createAction('questions/NEXT')();

export const questionsActions = {
  requestQuestions,
  nextQuestion,
}

export type QuestionsAction = ActionType<typeof questionsActions>;

export const questionsReducer = createReducer<IQuestionsState, QuestionsAction>(initialQuestionsState)
  .handleAction(requestQuestions.request, (state) => ({ ...state, loading: true, error: null }))
  .handleAction(requestQuestions.success, (state, action) => {
    // Shuffle the questions as per spec
    const questions = shuffle(action.payload);
    const current = questions.shift() || null;
    return {
      current,
      list: questions,
      loading: false,
      error: null,
    }
  })
  .handleAction(requestQuestions.failure, (state) => ({
    ...state,
    loading: false,
    error: "Failed to retrieve questions, please refresh the page."
  }))
  .handleAction(nextQuestion, (state, action) => {
    // Shouldn't be able to skip if still loading
    if (state.loading) return state;

    const remainingQuestions = state.list;
    const nextQuestion = remainingQuestions.shift() || null;
    return {
      ...state,
      current: nextQuestion,
      list: remainingQuestions,
    }
  });
