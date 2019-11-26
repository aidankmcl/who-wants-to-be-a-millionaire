import * as React from 'react';
import {
  IQuestionsState,
  QuestionsAction,
  initialQuestionsState,
  questionsReducer,
  questionsActions,
  questionGuard,
} from './questions';

import {
  IResultsState,
  ResultsAction,
  initialResultsState,
  resultsReducer,
  resultsActions,
  resultsGuard,
} from './results';

export interface IGlobalState {
  questions: IQuestionsState;
  results: IResultsState;
}

export const initialState: IGlobalState = {
  questions: initialQuestionsState,
  results: initialResultsState,
}

export type GlobalAction =
  QuestionsAction
  | ResultsAction;

export const actions = {
  ...questionsActions,
  ...resultsActions,
};

const GlobalContext = React.createContext<[IGlobalState, React.Dispatch<GlobalAction>]>([
  initialState,
  () => null
]);

export const globalReducer = (state: IGlobalState, action: GlobalAction): IGlobalState => {
  const { questions, results } = state;

  return {
    questions: questionGuard(action) ? questionsReducer(questions, action) : questions,
    results: resultsGuard(action) ? resultsReducer(results, action) : results,
  }
}

export const Provider: React.FC = ({ children }) => {
  const state = React.useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalState = () => React.useContext(GlobalContext);
