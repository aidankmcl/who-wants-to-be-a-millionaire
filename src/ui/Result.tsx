import React from 'react';

import { Result as TResult } from '../state/results';
import { Question } from '../state/questions';

type Props = {
  question: Question;
  result: TResult;
}

const getVerdict = (answer: number, correct: number) => {
  switch (answer) {
    case correct:
      return 'Correct!';
    case -1:
      return 'Skipped...';
    default:
      return 'Incorrect :(';
  }
}

export const Result: React.FC<Props>  = ({ question, result }) => {
  const { text, image, answers, correct } = question;

  return (
    <div>
      <p>{text}</p>
      <span>{image}</span>
      {answers.map((choice, i) => (
        <div key={i}>
          <p>{choice}</p>
        </div>
      ))}
      <p>Your Answer: {answers[result.answer]}</p>
      <span>{getVerdict(result.answer, correct)}</span><br/>
      <span>{(result.duration / 1000).toFixed(2)}</span>
    </div>
  );
}