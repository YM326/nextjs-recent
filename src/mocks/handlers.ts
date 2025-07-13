import { http, HttpResponse } from 'msw';

const generateRandomData = (page: number, length: number): { id: number; count: number }[] => {
  const data = [];
  const startId = (page - 1) * length + 1;

  for (let i = startId; i < startId + length; i++) {
    const count = Math.floor(Math.random() * 100) + 1;
    data.push({ id: i, count });
  }

  return data;
};

const isErrorRandomly = (threshold: number) => {
  const randomNumber = Math.random();
  return randomNumber < threshold;
};

export const handlers = [
  http.get('/api/usertest', async () => {
    return HttpResponse.json({
      id: 1,
      name: 'Youngmin',
      email: 'youngmin@example.com',
    });
  }),
  http.get('/api/randomnumbers', async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));

    const length = 10;
    const data = generateRandomData(page, length);

    return HttpResponse.json({ data, page });
  }),
];
