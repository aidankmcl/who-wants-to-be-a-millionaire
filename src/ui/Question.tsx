import React from 'react';

import { Question as TQuestion } from '../state/questions';

type Props = {
  info: TQuestion;
  disabledAnswers: number[];
  answerQuestion: (choice: number) => void;
}

export const Question: React.FC<Props> = ({ info, disabledAnswers, answerQuestion }) => {
  const { text, image, answers } = info;

  return (
    <div>
      <p>{text}</p>
      <span>{image}</span>
      {answers.map((choice, i) => (
        <div key={i} onClick={() => answerQuestion(i)}>
          <p>{disabledAnswers.includes(i) && <b>NOT THE ANSWER:</b>} {choice}</p>
        </div>
      ))}
    </div>
  )
};
