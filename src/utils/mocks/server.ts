import { setupServer } from 'msw/node';
import { handlers } from '@/utils/mocks/testHandlers';

export const server = setupServer(...handlers);
