import React from 'react';

import { Question as TQuestion } from '../state/questions';

type Props = {
  info: TQuestion;
  answerQuestion: (choice: number) => void;
}

export const Question: React.FC<Props>  = ({ info, answerQuestion }) => {
  const { text, image, answers, correct } = info;

  return (
    <div>
      <p>{text}</p>
      <span>{image}</span>
      {answers.map((choice, i) => (
        <div key={i} onClick={() => answerQuestion(i)}>
          <p>{choice}</p>
        </div>
      ))}
    </div>
  )
}