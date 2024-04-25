import axios from "axios";
import { TriviaMode } from "./triviaData";

export function fetchTriviaQuestions(mode: TriviaMode, token: string): Promise<{ data: any }> {
  const category = mode.category && mode.category !== 0 ? `&category=${mode.category}` : '';
  const difficulty = mode.difficulty && mode.difficulty !== 'any' ? `&difficulty=${mode.difficulty}` : '';
  const booleanType = mode.type && mode.type !== 'any' ? `&type=${mode.type}` : '';
  const triviaRequest = `https://opentdb.com/api.php?amount=10${category}${difficulty}${booleanType}&token=${token}`;
  return axios.get(triviaRequest);
}

export function fetchTriviaToken(): Promise<{ data: any }> {
  return axios.get('https://opentdb.com/api_token.php?command=request');
}

export function fetchTriviaCategories(): Promise<{ data: any }> {
  return axios.get('https://opentdb.com/api_category.php');
}
