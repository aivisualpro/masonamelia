import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ONE_HOUR = 60 * 60 * 1000;

async function fetchContact() {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/contacts`);
  return res.data.data; // the singleton contact doc
}

/** Fetch + cache contact info for 1 hour */
export function useContact(opts) {
  return useQuery({
    queryKey: ['contact'],
    queryFn: fetchContact,
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
    refetchOnWindowFocus: false,
    ...opts,
  });
}

/** Optional: prefetch helper */
export async function prefetchContact(queryClient) {
  await queryClient.prefetchQuery({
    queryKey: ['contact'],
    queryFn: fetchContact,
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
  });
}
