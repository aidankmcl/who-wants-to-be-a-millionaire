import React from 'react';
import ReactDOM from 'react-dom';
import { createAction } from 'typesafe-actions';

import { globalReducer, initialState, actions, IGlobalState } from '..';
import { Question } from '../questions';
import { Result } from '../results';

const emptyAction = createAction('EMPTY_ACTION')();

const testQuestion: Question = {
  id: 'ABC',
  text: 'Good question chief',
  answers: ['A', 'B', 'C'],
  correct: 0,
}

const testResult: Result = {
  questionId: 'ABC',
  answer: 1,
  duration: 5.5,
}

describe('global reducer', () => {
  it('returns initial state at start', () => {
    const state = globalReducer(initialState, emptyAction());
    expect(state).toStrictEqual(initialState);
  });

  it('returns updated state after getting questions', () => {
    const state = globalReducer(initialState, actions.requestQuestions.success([testQuestion]));
    const expectedState: IGlobalState['questions'] = {
      powerups: {
        removeTwo: { active: false, used: false },
        addTime: { active: false, used: false },
      },
      data: {
        [testQuestion.id]: testQuestion
      },
      current: testQuestion,
      queue: [],
      loading: false,
      error: null
    };

    expect(state.questions).toStrictEqual(expectedState);
  });

  it('returns updated results state after answering', () => {
    const stateReceivedQuestions = globalReducer(initialState, actions.requestQuestions.success([testQuestion]));
    const stateAfterAnswering = globalReducer(stateReceivedQuestions, actions.answerQuestion(testResult))

    const expectedState: IGlobalState['results'] = {
      answers: [testResult]
    };

    expect(stateAfterAnswering.results).toStrictEqual(expectedState);
  });

  it('updates remaining questions after moving to next question', () => {
    const stateReceivedQuestions = globalReducer(initialState, actions.requestQuestions.success([testQuestion]));
    const stateAfterAnswering = globalReducer(stateReceivedQuestions, actions.answerQuestion(testResult))
    const stateAfterIncrementing = globalReducer(stateAfterAnswering, actions.nextQuestion());

    const expectedState: IGlobalState['questions'] = {
      powerups: {
        removeTwo: { active: false, used: false },
        addTime: { active: false, used: false },
      },
      data: {
        [testQuestion.id]: testQuestion,
      },
      queue: [],
      current: null,
      loading: false,
      error: null,
    };

    expect(stateAfterIncrementing.questions).toStrictEqual(expectedState);
  });
});
