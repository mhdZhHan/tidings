import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import axios from 'axios';

export const useFetch = <T>(fn: () => Promise<T[]>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          `Error: ${error.response?.status} - ${
            error.response?.data?.message || error.message
          }`,
        );
      } else {
        setError(`An unexpected error occurred: ${(error as Error).message}`);
      }
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return {data, isLoading, error, refetch};
};
