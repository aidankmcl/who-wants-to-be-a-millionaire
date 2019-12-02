import React from 'react';
import { useHistory } from 'react-router';

import { useGlobalState } from '../state/index';
import { Result } from '../ui/Result';
import { Layout } from '../ui/Layout';
import { List } from '../ui/List';

export const Results: React.FC = () => {
  const [{ questions, results }] = useGlobalState();
  const history = useHistory();

  if (Object.keys(questions.data).length === 0 || results.answers.length === 0) {
    history.push('/quiz');
  }

  return (
    <Layout>
      <List>
        {results.answers.map((answer) => {
          const question = questions.data[answer.questionId];

          return question && (
            <li>
              <Result
                key={answer.questionId}
                question={question}
                result={answer}
              />
            </li>
          );
        })}
      </List>
    </Layout>
  );
}