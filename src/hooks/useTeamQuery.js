import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ONE_HOUR = 60 * 60 * 1000;

async function fetchTeam() {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/teams/lists`);
  return res.data.data; // just the array
}

/** Fetch + cache brands for 1 hour */
export function useTeam(opts) {
  return useQuery({
    queryKey: ['team'],
    queryFn: fetchTeam,
    // Cache behavior
    staleTime: ONE_HOUR,   // data considered fresh for 1 hour
    gcTime: ONE_HOUR,      // keep in cache for 1 hour (TanStack v5)
    refetchOnWindowFocus: false,
    ...opts,
  });
}

/** Optional: prefetch helper (e.g., in loaders or on app boot) */
export async function prefetchTeam(queryClient) {
  await queryClient.prefetchQuery({
    queryKey: ['team'],
    queryFn: fetchTeam,
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
  });
}
