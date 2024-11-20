import { useCallback, useState } from "react";

interface UseAsyncActionResult<Args extends any[], T>
  extends AsyncState<T> {
  trigger: (...args: Args) => void;
  perform: (...args: Args) => Promise<T>;
}

interface AsyncState<T> {
  data: T | undefined;
  loading: boolean;
  error?: unknown;
}

export function useAsyncAction<Args extends any[], T>(
    action: (...args: Args) => Promise<T>,
    initialState = {
      loading: false,
      error: undefined,
      data: undefined
    },
  ): UseAsyncActionResult<Args, T> {
  const [state, setState] = useState<AsyncState<T>>({
    loading: initialState?.loading ?? false,
    error: undefined,
    data: initialState?.data,
  });

  const perform = useCallback(
    async (...args: Args) => {
      setState(oldState => ({ ...oldState, loading: true }));
      try {
        const result = await action(...args);

        setState({ loading: false, error: undefined, data: result });

        return result;
      } catch (error) {
        setState(oldState => ({
          loading: false,
          error,
          data: oldState.data,
        }));

        throw error;
      }
    },
    [action],
  );
    
  const trigger = useCallback(
    (...args: Args) => {
      perform(...args).catch(() => {
        // Intentionally ignored
      });
    },
    [perform],
  );

  return {
    ...state,
    trigger,
    perform
  }
}