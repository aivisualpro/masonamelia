import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const ITEMS_PER_PAGE = 16;

export function buildUrl({ status, page, pageSize }) {
  const params = new URLSearchParams();
  if (page) params.set("page", String(page));
  if (pageSize) params.set("pageSize", String(pageSize));
  if (status && status !== "all") params.set("status", status);
  const base = import.meta.env.VITE_BASE_URL;
  return `${base}/api/aircrafts/lists?${params.toString()}`;
}

export async function fetchAircrafts({ status, page, pageSize, signal }) {
  const url = buildUrl({ status, page, pageSize });
  const { data } = await axios.get(url, { signal, withCredentials: false });
  return data; // raw server payload
}

export function useAircraftsQuery({ status, page }) {
  const isAll = status === "all";
  const pageToAsk = isAll ? page : 1;
  const pageSizeToAsk = isAll ? ITEMS_PER_PAGE : undefined;

  return useQuery({
    queryKey: ["aircrafts", { status, page: pageToAsk, pageSize: pageSizeToAsk }],
    queryFn: ({ signal }) =>
      fetchAircrafts({ status, page: pageToAsk, pageSize: pageSizeToAsk, signal }),

    // shape the data for the UI so Listing.jsx stays simple
    select: (raw) => {
      const list = Array.isArray(raw?.data) ? raw.data : [];
      const cleaned = list.filter((r) => r && r._id);

      const mapped = cleaned.map((r) => ({
        _id: r._id,
        title: r.title,
        year: r.year,
        price: Number(r.price || 0),
        category: r.status,
        aircraft: (r?.category?.slug || "").toLowerCase(),
        airframe: Number(r.airframe),
        engine: Number(r.engine),
        propeller: Number(r.propeller),
        images: Array.isArray(r.images) ? r.images : [],
        location: r.location,
        raw: r,
      }));

      const apiTotal =
        isAll ? Number(raw?.totalItems ?? raw?.total ?? mapped.length) : mapped.length;

      return { rows: mapped, serverTotalItems: apiTotal };
    },

    // prevent list flicker during page changes
    placeholderData: keepPreviousData,
  });
}
