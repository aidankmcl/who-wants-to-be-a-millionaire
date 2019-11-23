
import { createAction, createReducer, ActionType, Action } from 'typesafe-actions';

export type Result = {
  questionId: string;
  answer: number;
  duration: number;
}

export interface IResultsState {
  answers: Result[];
}

export const initialResultsState: IResultsState = {
  answers: [],
}

const TYPE_PREFIX = 'results/'
const answerQuestion = createAction(TYPE_PREFIX +'ANSWER')<Result>();

export const resultsActions = {
  answerQuestion
}

export type ResultsAction = ActionType<typeof resultsActions>;

export const resultsGuard = (action: Action): action is ResultsAction => {
  return action.type.includes(TYPE_PREFIX)
}

export const resultsReducer = createReducer<IResultsState, ResultsAction>(initialResultsState)
  .handleAction(answerQuestion, (state, action) => ({
      answers: [...state.answers, action.payload]
  }));
