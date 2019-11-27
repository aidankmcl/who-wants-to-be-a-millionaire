import React from 'react';

import { Question as TQuestion } from '../state/questions';
import { shuffle } from '../utils/array';

type Props = {
  info: TQuestion;
  help: boolean;
  answerQuestion: (choice: number) => void;
}

export const Question: React.FC<Props>  = ({ info, help, answerQuestion }) => {
  const { text, image, answers, correct } = info;

  let hiddenIndices: number[] = [];
  if (help) {
    const wrongOptions = answers
      .map((_, i) => i)
      .filter((index) => index !== correct);

    hiddenIndices = shuffle(wrongOptions).slice(0, 2);
  }

  return (
    <div>
      <p>{text}</p>
      <span>{image}</span>
      {answers.map((choice, i) => (
        <div key={i} onClick={() => answerQuestion(i)}>
          <p>{hiddenIndices.includes(i) && <b>NOT THE ANSWER:</b>} {choice}</p>
        </div>
      ))}
    </div>
  )
}