import React from 'react';

import { Question as TQuestion } from '../state/questions';
import { Title } from './Text';
import { Button } from './Button';

type Props = {
  info: TQuestion;
  disabledAnswers: number[];
  answerQuestion: (choice: number) => void;
}

export const Question: React.FC<Props> = ({ info, disabledAnswers, answerQuestion }) => {
  const { text, image, answers } = info;

  return (
    <div>
      <Title as="p">{text}</Title>
      {(image) && (
        <img src={image} />
      )}

      {answers.map((choice, i) => (
        <Button disabled={disabledAnswers.includes(i)} key={i} onClick={() => answerQuestion(i)}>
          {choice}
        </Button>
      ))}
    </div>
  )
};
