import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useGlobalState, actions } from '../state';
import { PowerupName } from '../state/questions';
import { Question } from '../ui/Question';
import { Error } from '../ui/Error';
import { LoadingIndicator } from '../ui/Loading';
import { Countdown } from '../ui/Countdown';
import { useTimer } from '../utils/timer';
import { shuffle } from '../utils/array';

import { getQuestions, hardCodedData } from '../utils/triviaAPI';
import { CountdownBar } from '../ui/CountdownBar';
import { Layout } from '../ui/Layout';
import { Button } from '../ui/Button';
import { padding } from '../ui/config';
import { Spacer } from '../ui/Spacer';
import { Center } from '../ui/Center';
import { Title } from '../ui/Text';

// All time in milliseconds
const allowedTime = 15 * 1000;

const QuizLayoutContainer = styled.div`
  .loading {
    display: block;
    width: 100%;
    height: 0.8rem;
    margin-left: auto;
  }

  .sidebar {
    display: inline-block;
    vertical-align: top;
    width: 9rem;
    padding-right: ${padding.medium};
    margin-top: -0.8rem;
  }

  .main {
    display: inline-block;
    vertical-align: top;
    margin-left: ${padding.medium}
    width: calc(100% - 11rem - ${padding.medium});
  }
`

export const Quiz = React.memo(() => {
  const [{ questions }, dispatch] = useGlobalState();
  const [hiddenIndices, setHiddenIndices] = React.useState<number[]>([]);

  React.useEffect(() => {
    // Mimic request to backend service
    dispatch(actions.requestQuestions.request())

    getQuestions().then((questions) => {
      dispatch(actions.requestQuestions.success(questions))
    }).catch((err) => {
      if (err.message === "Network Error" && err.response === undefined) {
        // Browser doesn't have access to internet, use hardcoded questions.
        dispatch(actions.requestQuestions.success(hardCodedData))
      } else {
        // Otherwise, handle error honestly
        dispatch(actions.requestQuestions.failure())
      }
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
  const skipQuestion = () => answerQuestion(-1, allowedTime);

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
    return (
      <Layout>
        <Center>
          <Error text={questions.error} />
        </Center>
      </Layout>
    );
  } else if (questions.loading) {
    return (
      <Layout>
        <Center>
          <LoadingIndicator />
        </Center>
      </Layout>
    );
  }

  return (questions.current) ? (
    <Layout>
      <QuizLayoutContainer>
        <div className="loading">
          <CountdownBar
            remainingTime={remainingTime}
            totalTime={allowedTime}
          />
        </div>

        <div className="sidebar">
          <Countdown
            remainingTime={remainingTime}
          />

          <Spacer size="medium" />

          <Button
            color="yellow"
            disabled={questions.powerups.addTime.used}
            onClick={() => activatePowerup('addTime')}
          >
            Add 10 Seconds!
          </Button>

          <Button
            color="green"
            disabled={questions.powerups.removeTwo.used}
            onClick={() => activatePowerup('removeTwo')}
          >
            50/50!
          </Button>

          <Spacer size="medium" />

          <Button
            color="lightblue"
            onClick={() => skipQuestion()}
          >
            Skip!
          </Button>
        </div>

        <div className="main">
          <Question
            key={questions.current.id}
            info={questions.current}
            disabledAnswers={hiddenIndices}
            answerQuestion={answerQuestion}
          />
        </div>
      </QuizLayoutContainer>
    </Layout>
  ) : (
    <Layout>
      <Title as="p">Quiz done! <br />Now you can see how you did here:</Title>
      <Link to='/results'><Button>See Results</Button></Link>
    </Layout>
  )
});
