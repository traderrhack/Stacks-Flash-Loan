import { useState, useCallback } from 'react';

export const useAsync = <T, E = string>(asyncFunction: () => Promise<T>) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response: T) => {
        setValue(response);
        setStatus('success');
      })
      .catch((error: any) => {
        setError(error);
        setStatus('error');
      });
  }, [asyncFunction]);

  return { execute, status, value, error };
};