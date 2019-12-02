import React from 'react';
import { useHistory } from 'react-router';

import { useGlobalState } from '../../state/index';
import { Result } from './components/Result';
import { Layout } from '../../ui/Layout';
import { List } from '../../ui/List';
import { KeyNumber } from './components/KeyNumber';
import { Spacer } from '../../ui/Spacer';

export const Results: React.FC = () => {
  const [{ questions, results }] = useGlobalState();
  const history = useHistory();

  // Send back to quiz page if no data is available
  if (Object.keys(questions.data).length === 0 || results.answers.length === 0) {
    history.push('/quiz');
  }

  let total = results.answers.length;
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  const resultsByQuestion = results.answers.map((result) => {
    const question = questions.data[result.questionId];

    if (result.answer === question.correct) {
      correct++
    } else if (result.answer === -1) {
      unanswered++
    } else {
      incorrect++
    }

    return question && (
      <li>
        <Result
          key={result.questionId}
          question={question}
          result={result}
        />
      </li>
    );
  });

  return (
    <Layout>
      <KeyNumber top={correct} bottom={total} sub='Correct'></KeyNumber>
      <KeyNumber top={incorrect} bottom={total} sub='Incorrect'></KeyNumber>
      <KeyNumber top={unanswered} bottom={total} sub='Unanswered'></KeyNumber>

      <Spacer size='large' />

      <List>
        {resultsByQuestion}
      </List>
    </Layout>
  );
}