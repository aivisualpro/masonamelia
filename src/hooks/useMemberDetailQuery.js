import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ONE_HOUR = 60 * 60 * 1000;

async function fetchMemberDetail(id) {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/teams/lists/${id}`
  );
  return res.data.data; // single member object
}

export function useMemberDetail(id, opts) {
  return useQuery({
    queryKey: ["member-detail", id],
    queryFn: () => fetchMemberDetail(id),
    enabled: !!id,               // don't fire until we have an id
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR,
    refetchOnWindowFocus: false,
    ...opts,
  });
}
