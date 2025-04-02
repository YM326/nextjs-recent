import { setupWorker } from 'msw/browser';
import { handlers } from '@/utils/mocks/testHandlers';

export const browser = setupWorker(...handlers);
