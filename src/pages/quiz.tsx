import React from 'react';
import { Link } from 'react-router-dom';

import { useGlobalState, actions } from '../state';
import { Question as TQuestion } from '../state/questions';
import { Question } from '../ui/Question';
import { Error } from '../ui/Error';
import { LoadingIndicator } from '../ui/Loading';
import { Countdown } from '../ui/Countdown';

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

// In milliseconds
const allowedTime = 15 * 1000;
const getNewEndTime = () => new Date().getTime() + allowedTime

export const Quiz = () => {
  const [{ questions }, dispatch] = useGlobalState();

  const [startTime, setStartTime] = React.useState(new Date().getTime());
  const [endTime, setEndTime] = React.useState(getNewEndTime());

  React.useEffect(() => {
    // Mimic request to backend service
    dispatch(actions.requestQuestions.request())
    // Use setTimeout to reflect delay in response.
    setTimeout(() => {
      if (Math.random() > 0.05) {
        dispatch(actions.requestQuestions.success(hardCodedQuestions))
      } else {
        // Randomly fail the request
        dispatch(actions.requestQuestions.failure())
      }
    }, (Math.random() * 250) + 50)
  }, [!!dispatch]) // Re-run effect if availability of dispatch function changes

  React.useEffect(() => {
    setStartTime(new Date().getTime());
    setEndTime(getNewEndTime());
  }, [JSON.stringify(questions.current)])

  if (questions.error) {
    return <Error text={questions.error} />
  } else if (questions.loading) {
    return <LoadingIndicator />
  }

  const answerQuestion = (choice: number, duration?: number) => {
    if (questions.current) {
      duration = duration || new Date().getTime() - startTime;
      // Manage interaction with global state
      dispatch(actions.answerQuestion({
        questionId: questions.current.id,
        duration,
        answer: choice
      }));

      dispatch(actions.nextQuestion());
    }
  };

  // Create new function rather than using answerQuestion directly
  // to prescribe behavior of a skip
  const skipQuestion = () => {
    answerQuestion(-1, allowedTime);
  }

  return (questions.current) ? (
    <div>
      <Countdown startTime={startTime} endTime={endTime} />
      <Question
        key={questions.current.id}
        info={questions.current}
        answerQuestion={answerQuestion}
      />
      <button onClick={() => skipQuestion()}>Skip!</button>
    </div>
  ) : (
    <div>
      <p>Quiz done! Now you can see how you did:</p>
      <Link to='/results'><button>See Results</button></Link>
    </div>
  )
}