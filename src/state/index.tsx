import * as React from 'react';
import {
  IQuestionsState,
  QuestionsAction,
  initialQuestionsState,
  questionsReducer,
  questionsActions,
} from './questions';

interface IGlobalState {
  questions: IQuestionsState;
}

const initialState: IGlobalState = {
  questions: initialQuestionsState,
}

type GlobalAction = QuestionsAction;
export const actions = {
  ...questionsActions
};

const GlobalContext = React.createContext<[IGlobalState, React.Dispatch<GlobalAction>]>([
  initialState,
  () => null
]);


const globalReducer = (state: IGlobalState, action: GlobalAction): IGlobalState => {
  const { questions } = state;

  return {
    questions: questionsReducer(questions, action)
  }
}

const PreventRerender = React.memo(({ children }) => (<>{children}</>), () => true)

export const Provider: React.FC = ({ children }) => {
  const state = React.useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={state}>
      <PreventRerender>
        {children}
      </PreventRerender>
    </GlobalContext.Provider>
  )
}

export const useGlobalState = () => React.useContext(GlobalContext);
