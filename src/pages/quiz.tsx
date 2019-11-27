import React from 'react';
import { Link } from 'react-router-dom';

import { useGlobalState, actions } from '../state';
import { Question as TQuestion, PowerupName } from '../state/questions';
import { Question } from '../ui/Question';
import { Error } from '../ui/Error';
import { LoadingIndicator } from '../ui/Loading';
import { Countdown } from '../ui/Countdown';

const hardCodedQuestions: TQuestion[] = [{
  id: '123EASY',
  text: 'Hi',
  answers: ['A', 'B', 'Hello!', 'C'],
  correct: 2,
}, {
  id: 'ASABC',
  text: 'Bye',
  answers: ['A', 'B', 'Stay a while!', 'C'],
  correct: 2,
}];

// In milliseconds
const allowedTime = 3 * 1000;
const getNewEndTime = () => new Date().getTime() + allowedTime

type Powerup = 'removeTwo' | 'addTime' | null;
type RemoveTwoInfo = {
  active: boolean;
  used: boolean;
}

export const Quiz = React.memo(() => {
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

  console.log(questions.powerups);

  React.useEffect(() => {
    if (questions.current) {
      const newEndTime = getNewEndTime()
      const remainingTime = newEndTime - new Date().getTime();
      setStartTime(new Date().getTime());
      setEndTime(newEndTime);

      const countdownTimer = setTimeout(() => {
        skipQuestion();
      }, remainingTime);

      return () => clearTimeout(countdownTimer)
    }
  }, [JSON.stringify(questions.current)])

  // Create new function rather than using answerQuestion directly
  // to prescribe behavior of a skip
  const skipQuestion = () => {
    answerQuestion(-1, allowedTime);
  }

  const activatePowerup = (powerup: PowerupName) => {
    console.log(questions.powerups);
    dispatch(actions.activatePowerup(powerup));
  }

  if (questions.error) {
    return <Error text={questions.error} />
  } else if (questions.loading) {
    return <LoadingIndicator />
  }

  return (questions.current) ? (
    <div>
      <Countdown startTime={startTime} endTime={endTime} />
      <Question
        key={questions.current.id}
        info={questions.current}
        help={questions.powerups.removeTwo.active}
        answerQuestion={answerQuestion}
      />
      <button onClick={() => activatePowerup('addTime')}>Add 10 Seconds!</button>
      <button onClick={() => activatePowerup('removeTwo')}>50/50!</button>
      <button onClick={() => skipQuestion()}>Skip!</button>
    </div>
  ) : (
    <div>
      <p>Quiz done! Now you can see how you did:</p>
      <Link to='/results'><button>See Results</button></Link>
    </div>
  )
});
