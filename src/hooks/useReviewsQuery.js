import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ONE_HOUR = 60 * 60 * 1000;

async function fetchReviews() {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/reviews/lists`);
  return res.data.data; // just the array
}

/** Fetch + cache brands for 1 hour */
export function useReviews(opts) {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
    // Cache behavior
    staleTime: ONE_HOUR,   // data considered fresh for 1 hour
    gcTime: ONE_HOUR,      // keep in cache for 1 hour (TanStack v5)
    refetchOnWindowFocus: false,
    ...opts,
  });
}

/** Optional: prefetch helper (e.g., in loaders or on app boot) */
export async function prefetchReviews(queryClient) {
  await queryClient.prefetchQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
  });
}
