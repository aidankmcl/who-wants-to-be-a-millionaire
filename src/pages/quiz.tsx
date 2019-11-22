import React from 'react';
import { Link } from 'react-router-dom';

import { useGlobalState, actions } from '../state';
import { Question as TQuestion } from '../state/questions';
import { Question } from '../ui/Question';
import { Error } from '../ui/Error';
import { LoadingIndicator } from '../ui/Loading';

const hardCodedQuestions: TQuestion[] = [{
  id: '123EASY',
  text: 'Hi',
  answers: ['A', 'B', 'Hello!'],
  correct: 2
}, {
  id: 'ASABC',
  text: 'Bye',
  answers: ['A', 'B', 'Stay a while!'],
  correct: 2
}];

export const Quiz = () => {
  const [{ questions }, dispatch] = useGlobalState();

  React.useEffect(() => {
    dispatch(actions.requestQuestions.request())
    // Mimic request
    setTimeout(() => {
      if (Math.random() > 0.05) {
        dispatch(actions.requestQuestions.success(hardCodedQuestions))
      } else {
        dispatch(actions.requestQuestions.failure())
      }
    }, (Math.random() * 250) + 50)
  }, [!!dispatch]) // Re-run effect if availability of dispatch function changes

  if (questions.error) {
    return <Error text={questions.error} />
  } else if (questions.loading) {
    return <LoadingIndicator />
  }

  return (questions.current) ? (
    <div>
      <Question key={questions.current.id} info={questions.current} />
      <button onClick={() => dispatch(actions.nextQuestion())}>Skip!</button>
    </div>
  ) : (
    <div>
      <p>Quiz done! Now you can see how you did:</p>
      <Link to='/results'><button>See Results</button></Link>
    </div>
  )
}