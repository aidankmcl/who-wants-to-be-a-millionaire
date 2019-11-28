import React from 'react';
import { Link } from 'react-router-dom';

import { useGlobalState, actions } from '../state';
import { Question as TQuestion, PowerupName } from '../state/questions';
import { Question } from '../ui/Question';
import { Error } from '../ui/Error';
import { LoadingIndicator } from '../ui/Loading';
import { Countdown } from '../ui/Countdown';
import { useTimer } from '../utils/timer';
import { shuffle } from '../utils/array';

import { getQuestions } from './quizAPI';

// All time in milliseconds
const allowedTime = 15 * 1000;

export const Quiz = React.memo(() => {
  const [{ questions }, dispatch] = useGlobalState();
  const [hiddenIndices, setHiddenIndices] = React.useState<number[]>([]);

  React.useEffect(() => {
    // Mimic request to backend service
    dispatch(actions.requestQuestions.request())

    getQuestions().then((questions) => {
      dispatch(actions.requestQuestions.success(questions))
    }).catch(() => {
      dispatch(actions.requestQuestions.failure())
    });
  }, [!!dispatch]) // Re-run effect if availability of dispatch function changes

  const answerQuestion = (choice: number, duration?: number) => {
    if (questions.current) {
      duration = duration || allowedTime - remainingTime;

      if (questions.powerups.addTime.active) {
        duration = allowedTime
      }

      // Manage interaction with global state
      dispatch(actions.answerQuestion({
        questionId: questions.current.id,
        duration,
        answer: choice
      }));

      dispatch(actions.nextQuestion());
    }
  };

  const [remainingTime, timeup, setTime] = useTimer(allowedTime, 1000);

  React.useEffect(() => {
    if (questions.powerups.addTime.active) {
      setTime(remainingTime + (10 * 1000));
    }
  }, [questions.powerups.addTime.active])

  React.useEffect(() => {
    if (questions.powerups.removeTwo.active && questions.current) {
      const { answers, correct } = questions.current;
      const wrongOptions = answers
        .map((_, i) => i)
        .filter((index) => index !== correct);

      setHiddenIndices(shuffle(wrongOptions).slice(0, 2));
    }
  }, [questions.powerups.removeTwo.active])

  // Create new function rather than using answerQuestion directly
  // to prescribe behavior of a skip
  const skipQuestion = () => {
    answerQuestion(-1, allowedTime);
  }

  const activatePowerup = (powerup: PowerupName) => {
    dispatch(actions.activatePowerup(powerup));
  }

  React.useEffect(() => {
    if (questions.current) skipQuestion();
  }, [timeup])

  React.useEffect(() => {
    setTime(allowedTime);
    setHiddenIndices([]);
  }, [JSON.stringify(questions.current)])

  if (questions.error) {
    return <Error text={questions.error} />
  } else if (questions.loading) {
    return <LoadingIndicator />
  }

  return (questions.current) ? (
    <div>
      <Countdown
        remainingTime={remainingTime}
        totalTime={allowedTime}
      />
      <Question
        key={questions.current.id}
        info={questions.current}
        disabledAnswers={hiddenIndices}
        answerQuestion={answerQuestion}
      />
      <button
        disabled={questions.powerups.addTime.used}
        onClick={() => activatePowerup('addTime')}
      >
        Add 10 Seconds!
      </button>

      <button
        disabled={questions.powerups.removeTwo.used}
        onClick={() => activatePowerup('removeTwo')}
      >
        50/50!
      </button>
      <button onClick={() => skipQuestion()}>Skip!</button>
    </div>
  ) : (
    <div>
      <p>Quiz done! Now you can see how you did:</p>
      <Link to='/results'><button>See Results</button></Link>
    </div>
  )
});
