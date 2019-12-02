/*
 * This is just a start on testing to show where I'd go with it
 **/
import React from 'react';
import { MemoryRouter } from 'react-router';

import axios from 'axios';
jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

import {render, fireEvent, waitForElement, getByTestId} from '@testing-library/react'

import fakeData from './pages/quiz/fakeData.json';
import { Provider } from './state/index';
import { AppStyle, Routes as AppRoutes } from './App';
import { act } from 'react-dom/test-utils';

axiosMock.get.mockResolvedValue({
  data: fakeData
});

type TestProps = {
  start?: string
}

const TestApp: React.FC<TestProps> = ({ start = '/' }) => (
  <Provider>
    <AppStyle />
    <MemoryRouter initialEntries={[start]} initialIndex={0}>
      <AppRoutes />
    </MemoryRouter>
  </Provider>
);

describe('App', () => {
  it('renders without crashing', () => {
    const { unmount } = render(<TestApp />)
    unmount();
  });

  it('can navigate to quiz page', async () => {
    const { getByText, unmount } = render(<TestApp />);
    fireEvent.click(getByText('Start Quiz!'));

    const powerupButton = await waitForElement(() => getByText('+10 Seconds!'));
    expect(powerupButton.innerHTML).toBe('+10 Seconds!');

    unmount();
  });
})

describe('Quiz', () => {
  it('can answer a question and move to next', async () => {
    const { container } = render(<TestApp start='/quiz' />);

    const firstQuestionText = await waitForElement(() => getByTestId(container, 'question-text'));

    const firstChoice = await waitForElement(() => getByTestId(container, 'answer-0'));
    fireEvent.click(firstChoice);

    const secondQuestionText = await waitForElement(() => getByTestId(container, 'question-text'));
    expect(firstQuestionText).not.toEqual(secondQuestionText);
  });

  it('can skip a question and move to next', async () => {
    const { container, getByText } = render(<TestApp start='/quiz' />);

    const skipButton = await waitForElement(() => getByText('Skip!'));
    const firstQuestionText = await waitForElement(() => getByTestId(container, 'question-text'));

    fireEvent.click(skipButton);

    const secondQuestionText = await waitForElement(() => getByTestId(container, 'question-text'));
    expect(firstQuestionText).not.toEqual(secondQuestionText);
  });
});
