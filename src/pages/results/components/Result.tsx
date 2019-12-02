import React from 'react';

import { Result as TResult } from '../../../state/results';
import { Question } from '../../../state/questions';
import { Title, Text } from '../../../ui/Text';
import { Button } from '../../../ui/Button';
import { AvailableColor } from '../../../ui/config';

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

const getAnswerColor = (answerIndex: number, question: Question, result: TResult): AvailableColor => {
  // Correct answer should always be green
  if (answerIndex === question.correct) return 'green';
  // If provided answer is not the correct answer, it's incorrect
  if (answerIndex === result.answer) return 'red';
  // Finally, if an answer was provided, all options should be filled in
  return 'white';
}

export const Result: React.FC<Props>  = ({ question, result }) => {
  const { text, image, answers } = question;

  return (
    <div>
      <Title as='p'>{text}</Title>
      {(image) && (
        <img alt={text} src={image} />
      )}

      <Text>{getInfo(result.answer, question.correct, result.duration)}</Text>

      {answers.map((choice, i) => (
        <Button
          key={i}
          className='no-hover'
          // If a contestant skipped, all but the correct answer should look disabled
          disabled={result.answer === -1 && i !== question.correct}
          color={getAnswerColor(i, question, result)}
        >
          {choice}
        </Button>
      ))}
    </div>
  );
}