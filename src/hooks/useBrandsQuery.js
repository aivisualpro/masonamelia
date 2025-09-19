import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ONE_HOUR = 60 * 60 * 1000;

async function fetchBrands() {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/brands/lists`);
  return res.data.data; // just the array
}

/** Fetch + cache brands for 1 hour */
export function useBrands(opts) {
  return useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    // Cache behavior
    staleTime: ONE_HOUR,   // data considered fresh for 1 hour
    gcTime: ONE_HOUR,      // keep in cache for 1 hour (TanStack v5)
    refetchOnWindowFocus: false,
    ...opts,
  });
}

/** Optional: prefetch helper (e.g., in loaders or on app boot) */
export async function prefetchBrands(queryClient) {
  await queryClient.prefetchQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
  });
}
