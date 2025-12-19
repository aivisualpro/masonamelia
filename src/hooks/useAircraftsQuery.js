import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

export const ITEMS_PER_PAGE = 16;

export function buildUrl({
  searchKeyword,
  status = "all",
  page = 1,
  pageSize = ITEMS_PER_PAGE,
  categories = [],
  priceRange,
  airframeRange,
  engineRange,
}) {
  const base = import.meta.env.VITE_BASE_URL;
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  if (status && status !== "all") params.set("status", status);

  if (searchKeyword) {
    params.set("searchKeyword", searchKeyword);
  }

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
  searchKeyword = "",
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
        searchKeyword,
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
        searchKeyword,
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
        ...r,
        _id: r._id,
        title: r.title ?? "",
        price: Number(r.price ?? 0),
        status: String(r.status ?? "").toLowerCase(),
        category: String(r?.category?.slug ?? r.category ?? "").toLowerCase(),
        featuredImage: r.featuredImage ?? r.images?.[0] ?? "",
        overview: r.overview ?? "",
        airframe: Number(r.airframe ?? 0),
        engine: Number(r.engine ?? 0),
        propeller: Number(r.propeller ?? 0),
      }));

      return {
        rows,
        meta: {
          total: Number(raw?.total ?? rows.length),
          totalItems: Number(raw?.totalItems ?? rows.length),
          page: Number(raw?.page ?? 1),
          pageRequested: Number(raw?.pageRequested ?? raw?.page ?? 1),
          pageSize: Number(raw?.pageSize ?? ITEMS_PER_PAGE),
          pageCount:
            Number(raw?.pageCount) ||
            Math.max(1, Math.ceil((raw?.totalItems || rows.length) / ITEMS_PER_PAGE)),
          hasPrev: !!raw?.hasPrev,
          hasNext: !!raw?.hasNext,
        },
      };
    },
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });
}

/* ---------- NEW: Ranges ---------- */

function buildRangesUrl({ status = "all", categories = [] } = {}) {
  const base = import.meta.env.VITE_BASE_URL;
  const params = new URLSearchParams();
  if (status && status !== "all") params.set("status", status);
  if (Array.isArray(categories) && categories.length) {
    params.set("categories", categories.join(","));
  }
  return `${base}/api/aircrafts/lists/ranges?${params.toString()}`;
}

async function fetchRanges({ status = "all", categories = [], signal } = {}) {
  const url = buildRangesUrl({ status, categories });
  const { data } = await axios.get(url, { signal, withCredentials: false });
  // expect { success, data: { minPrice, maxPrice, minAirframe, maxAirframe, minEngine, maxEngine } }
  return data?.data || {};
}

export function useRangesQuery({ status = "all", categories = [] } = {}) {
  return useQuery({
    queryKey: ["ranges", { status, categories }],
    queryFn: ({ signal }) => fetchRanges({ status, categories, signal }),
    staleTime: 60_000,
  });
}
