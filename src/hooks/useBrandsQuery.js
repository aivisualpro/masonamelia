import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const THIRTY_SEC = 30 * 1000;

async function fetchBrands() {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/brands/lists`);
  return res.data.data; // just the array
}

/** Fetch + cache brands — short staleTime so dashboard changes appear quickly */
export function useBrands(opts) {
  return useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    staleTime: THIRTY_SEC,
    gcTime: 5 * 60 * 1000, // keep in gc for 5 min
    refetchOnWindowFocus: true,
    ...opts,
  });
}

/** Optional: prefetch helper (e.g., in loaders or on app boot) */
export async function prefetchBrands(queryClient) {
  await queryClient.prefetchQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    staleTime: THIRTY_SEC,
    gcTime: 5 * 60 * 1000,
  });
}
