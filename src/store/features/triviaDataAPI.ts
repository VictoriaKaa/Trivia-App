import axios from "axios";
import { Category, Question, TriviaMode } from "./triviaData";

interface TriviaQuestions {
  response_code: number;
  results: Question[];
}

interface TriviaCategories {
  response_code: number;
  trivia_categories: Category[];
}

interface TriviaToken {
  response_code: number;
  token: string;
}

export function fetchTriviaQuestions(mode: TriviaMode, token: string): Promise<{ data: TriviaQuestions }> {
  const category = mode.category && mode.category !== 0 ? `&category=${mode.category}` : '';
  const difficulty = mode.difficulty && mode.difficulty !== 'any' ? `&difficulty=${mode.difficulty}` : '';
  const booleanType = mode.type && mode.type !== 'any' ? `&type=${mode.type}` : '';
  const triviaRequest = `https://opentdb.com/api.php?amount=10${category}${difficulty}${booleanType}&token=${token}`;
  return axios.get(triviaRequest);
}

export function fetchTriviaToken(): Promise<{ data: TriviaToken }> {
  return axios.get('https://opentdb.com/api_token.php?command=request');
}

export function fetchTriviaCategories(): Promise<{ data: TriviaCategories }> {
  return axios.get('https://opentdb.com/api_category.php');
}
