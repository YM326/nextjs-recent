import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ErrorStoreState {
  errorString: string | undefined;
}

interface ErrorStoreActions {
  setErrorString: (changeErrorString: string | undefined) => void;
}

export type ErrorStore = ErrorStoreState & ErrorStoreActions;

export const useErrorStore = create<ErrorStore>()(
  devtools((set) => ({
    errorString: undefined,
    setErrorString: (changeErrorString: string | undefined) => set(() => ({ errorString: changeErrorString })),
  })),
);
