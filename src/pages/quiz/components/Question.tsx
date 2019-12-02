import React from 'react';

import { Question as TQuestion } from '../../../state/questions';
import { Title } from '../../../ui/Text';
import { Button } from '../../../ui/Button';

type Props = {
  info: TQuestion;
  disabledAnswers: number[];
  answerQuestion: (choice: number) => void;
}

export const Question: React.FC<Props> = ({ info, disabledAnswers, answerQuestion }) => {
  const { text, image, answers } = info;

  return (
    <div>
      <Title as='p' data-testid='question-text'>{text}</Title>
      {(image) && (
        <img alt={text} src={image} />
      )}

      {answers.map((choice, i) => (
        <Button
          key={i}
          data-testid={'answer-' + i}
          disabled={disabledAnswers.includes(i)}
          onClick={() => answerQuestion(i)}
        >
          {choice}
        </Button>
      ))}
    </div>
  )
};
