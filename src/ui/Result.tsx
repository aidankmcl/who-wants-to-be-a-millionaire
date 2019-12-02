import React from 'react';

import { Result as TResult } from '../state/results';
import { Question } from '../state/questions';
import { Title, Text } from './Text';
import { Button } from './Button';

type Props = {
  question: Question;
  result: TResult;
}

const getInfo = (answer: number, correct: number, time: number): string => {
  const seconds = (time / 1000).toFixed(0);

  switch (answer) {
    case correct:
      return `You got the correct answer within ${seconds} seconds!`;
    case -1:
      return 'You didn\'t answer this question! 15 seconds were added to your total time.';
    default:
      return `Incorrect! Option ${correct + 1} was right but you chose ${answer + 1} after ${seconds} seconds`
  }
}

export const Result: React.FC<Props>  = ({ question, result }) => {
  const { text, image, answers } = question;

  return (
    <div>
      <Title as="p">{text}</Title>
      {(image) && (
        <img src={image} />
      )}

      <Text>{getInfo(result.answer, question.correct, result.duration)}</Text>

      {answers.map((choice, i) => (
        <Button
          key={i}
          className="no-hover"
          color={(i === question.correct) ? 'green' : (i === result.answer) ? 'red' : 'white'}
        >
          {choice}
        </Button>
      ))}
    </div>
  );
}