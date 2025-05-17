import { http, HttpResponse } from 'msw';

const isErrorRandomly = (threshold: number) => {
  const randomNumber = Math.random();
  return randomNumber < threshold;
};

export const handlers = [];
