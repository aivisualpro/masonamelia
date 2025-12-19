// hooks/useCategoriesQuery.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCategoriesQuery() {
  const base = import.meta.env.VITE_BASE_URL;
  return useQuery({
    queryKey: ["aircraftCategories"],
    queryFn: async ({ signal }) => {
      const url = `${base}/api/aircraftCategories/lists`;
      const { data } = await axios.get(url, { signal });
      return Array.isArray(data?.data) ? data.data : [];
    },
    // select: (rows) => {
    //   const slugs = rows
    //     .map((c) => String(c?.slug || "").trim().toLowerCase())
    //     .filter(Boolean);
    //   // const uniq = Array.from(new Set(slugs));
    //   // return uniq.sort((a, b) => a.localeCompare(b));
    //   return slugs
    // },
    staleTime: 60_000,
  });
}
