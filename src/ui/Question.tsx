import React from 'react';

import { Question as TQuestion } from '../state/questions';

type Props = {
  info: TQuestion
}

export const Question: React.FC<Props>  = ({ info }) => {
  const { text, image, answers, correct } = info;
  return (
    <div>
      <p>{text}</p>
      <span>{image}</span>
      <span>{answers}</span>
      <span>{correct}</span>
    </div>
  )
}