import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

export const ITEMS_PER_PAGE = 16;

export function buildUrl({
  status = "all",
  page = 1,
  pageSize = ITEMS_PER_PAGE,
  categories = [],          // ["cirrus","piper"]
  priceRange,               // [min,max] -> sends minPrice/maxPrice
  airframeRange,            // [min,max] -> sends minAirframe/maxAirframe
  engineRange,              // [min,max] -> sends minEngine/maxEngine
}) {
  const base = import.meta.env.VITE_BASE_URL;
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  if (status && status !== "all") params.set("status", status);

  if (Array.isArray(categories) && categories.length) {
    params.set("categories", categories.join(","));
  }

  if (Array.isArray(priceRange) && priceRange.length === 2) {
    const [minP, maxP] = priceRange.map(Number);
    if (Number.isFinite(minP)) params.set("minPrice", String(minP));
    if (Number.isFinite(maxP)) params.set("maxPrice", String(maxP));
  }

  if (Array.isArray(airframeRange) && airframeRange.length === 2) {
    const [minA, maxA] = airframeRange.map(Number);
    if (Number.isFinite(minA)) params.set("minAirframe", String(minA));
    if (Number.isFinite(maxA)) params.set("maxAirframe", String(maxA));
  }

  if (Array.isArray(engineRange) && engineRange.length === 2) {
    const [minE, maxE] = engineRange.map(Number);
    if (Number.isFinite(minE)) params.set("minEngine", String(minE));
    if (Number.isFinite(maxE)) params.set("maxEngine", String(maxE));
  }

  return `${base}/api/aircrafts/lists?${params.toString()}`;
}

async function fetchAircrafts(args) {
  const url = buildUrl(args);
  const { signal } = args;
  const { data } = await axios.get(url, { signal, withCredentials: false });
  return data;
}

export function useAircraftsQuery({
  status = "all",
  page = 1,
  pageSize = ITEMS_PER_PAGE,
  categories = [],
  priceRange,
  airframeRange,
  engineRange,
}) {
  return useQuery({
    queryKey: [
      "aircrafts",
      {
        status,
        page,
        pageSize,
        categories,
        priceRange: priceRange ?? null,
        airframeRange: airframeRange ?? null,
        engineRange: engineRange ?? null,
      },
    ],
    queryFn: ({ signal }) =>
      fetchAircrafts({
        status,
        page,
        pageSize,
        categories,
        priceRange,
        airframeRange,
        engineRange,
        signal,
      }),
    select: (raw) => {
      const list = Array.isArray(raw?.data) ? raw.data : [];
      const rows = list.map((r) => ({
        _id: r._id,
        title: r.title,
        year: r.year,
        price: Number(r.price || 0),
        status: String(r.status || "").toLowerCase(), // ✅ for tab check
        aircraft: (r?.category?.slug || "").toLowerCase(),
        airframe: Number(r.airframe),
        engine: Number(r.engine),
        propeller: Number(r.propeller),
        images: Array.isArray(r.images) ? r.images : [],
        location: r.location,
        raw: r,
      }));

      return {
        rows,
        meta: {
          total: Number(raw?.total ?? rows.length),            // items on this page
          totalItems: Number(raw?.totalItems ?? rows.length),  // all matching
          page: Number(raw?.page ?? 1),                        // effective page (clamped)
          pageRequested: Number(raw?.pageRequested ?? raw?.page ?? 1),
          pageSize: Number(raw?.pageSize ?? ITEMS_PER_PAGE),
          pageCount: Number(
            raw?.pageCount ??
              Math.max(1, Math.ceil((raw?.totalItems || rows.length) / ITEMS_PER_PAGE))
          ),
          hasPrev: !!raw?.hasPrev,
          hasNext: !!raw?.hasNext,
        },
      };
    },
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });
}
