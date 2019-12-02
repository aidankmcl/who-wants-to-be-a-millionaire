
import axios from 'axios';

import { Question } from '../../state/questions';
import { pseudoUUID } from '../../utils/random';
import fakeData from './fakeData.json';

type APIQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export type RawResponse = {
  response_code: number;
  results: APIQuestion[]
}

const TRIVIA_API_URL = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple&encode=url3986';

const convertAPIResponse = (triviaResponse: RawResponse): Question[] => {
  return triviaResponse.results.map((rawQuestion) => {
    const correct = Math.floor(Math.random() * (rawQuestion.incorrect_answers.length + 1));
    const answers = rawQuestion.incorrect_answers.map((answer) => decodeURIComponent(answer));
    answers.splice(correct, 0, decodeURIComponent(rawQuestion.correct_answer));
    return {
      id: pseudoUUID(),
      text: decodeURIComponent(rawQuestion.question),
      answers,
      correct
    }
  });
}

export const hardCodedData = convertAPIResponse(fakeData);

export const getQuestions = async (): Promise<Question[]> => {
  const response = await axios.get<RawResponse>(TRIVIA_API_URL);
  return convertAPIResponse(response.data);
}