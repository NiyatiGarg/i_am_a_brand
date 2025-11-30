import useSWR from 'swr';
import api from '@/lib/api';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useApi<T>(url: string | null, options?: any) {
  return useSWR<T>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
}

