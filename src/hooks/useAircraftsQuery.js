// import { useQuery, keepPreviousData } from "@tanstack/react-query";
// import axios from "axios";

// const ITEMS_PER_PAGE = 16;

// export function buildUrl({ status, page, pageSize }) {
//   const params = new URLSearchParams();
//   if (page) params.set("page", String(page));
//   if (pageSize) params.set("pageSize", String(pageSize));
//   if (status && status !== "all") params.set("status", status);
//   const base = import.meta.env.VITE_BASE_URL;
//   return `${base}/api/aircrafts/lists?${params.toString()}`;
// }

// export async function fetchAircrafts({ status, page, pageSize, signal }) {
//   const url = buildUrl({ status, page, pageSize });
//   const { data } = await axios.get(url, { signal, withCredentials: false });
//   return data; // raw server payload
// }

// export function useAircraftsQuery({ status, page }) {
//   const isAll = status === "all";
//   // const pageToAsk = isAll ? page : 1;
//   // const pageSizeToAsk = isAll ? ITEMS_PER_PAGE : undefined;
//   const pageToAsk = page ?? 1;
//   const pageSizeToAsk = ITEMS_PER_PAGE;

//   return useQuery({
//     queryKey: [
//       "aircrafts",
//       { status, page: pageToAsk, pageSize: pageSizeToAsk },
//     ],
//     queryFn: ({ signal }) =>
//       fetchAircrafts({
//         status,
//         page: pageToAsk,
//         pageSize: pageSizeToAsk,
//         signal,
//       }),

//     // shape the data for the UI so Listing.jsx stays simple
//     select: (raw) => {
//       const list = Array.isArray(raw?.data) ? raw.data : [];
//       const cleaned = list.filter((r) => r && r._id);

//       const mapped = cleaned.map((r) => ({
//         _id: r._id,
//         title: r.title,
//         year: r.year,
//         price: Number(r.price || 0),
//         category: r.status,
//         aircraft: (r?.category?.slug || "").toLowerCase(),
//         airframe: Number(r.airframe),
//         engine: Number(r.engine),
//         propeller: Number(r.propeller),
//         images: Array.isArray(r.images) ? r.images : [],
//         location: r.location,
//         raw: r,
//       }));

//       // const apiTotal =
//       //   isAll ? Number(raw?.totalItems ?? raw?.total ?? mapped.length) : mapped.length;

//       const totalFromServer = Number(
//         raw?.totalItems ?? raw?.total ?? raw?.count ?? raw?.meta?.total
//       );
//       const apiTotal =
//         Number.isFinite(totalFromServer) && totalFromServer > 0
//           ? totalFromServer
//           : mapped.length;

//       return { rows: mapped, serverTotalItems: apiTotal };
//     },

//     // prevent list flicker during page changes
//     placeholderData: keepPreviousData,
//   });
// }


// hooks/useAircraftsQuery.js
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const ITEMS_PER_PAGE = 16;

// ---- Build server URL with filters ----
export function buildUrl({
  status = "all",
  page = 1,
  pageSize = ITEMS_PER_PAGE,
  categories = [],              // array of slugs: ["cirrus","piper",...]
  priceRange,                   // [min,max] or undefined
  airframeRange,                // [min,max] or undefined
  engineRange,                  // [min,max] or undefined
}) {
  const base = import.meta.env.VITE_BASE_URL;
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  if (status && status !== "all") params.set("status", status);

  if (Array.isArray(categories) && categories.length) {
    params.set("categories", categories.join(",")); // comma separated
  }

  if (Array.isArray(priceRange) && priceRange.length === 2) {
    const [minP, maxP] = priceRange.map(Number);
    if (Number.isFinite(minP)) params.set("minPrice", String(minP));
    if (Number.isFinite(maxP)) params.set("maxPrice", String(maxP));
  }

  if (Array.isArray(airframeRange) && airframeRange.length === 2) {
    const [min, max] = airframeRange.map(Number);
    if (Number.isFinite(min)) params.set("minAirframe", String(min));
    if (Number.isFinite(max)) params.set("maxAirframe", String(max));
  }

  if (Array.isArray(engineRange) && engineRange.length === 2) {
    const [min, max] = engineRange.map(Number);
    if (Number.isFinite(min)) params.set("minEngine", String(min));
    if (Number.isFinite(max)) params.set("maxEngine", String(max));
  }

  return `${base}/api/aircrafts/lists?${params.toString()}`;
}

async function fetchAircrafts(args) {
  const url = buildUrl(args);
  const { signal } = args;
  const { data } = await axios.get(url, { signal, withCredentials: false });
  return data;
}

// ---- React Query hook (keeps UI mapping same) ----
export function useAircraftsQuery({
  status = "all",
  page = 1,
  categories = [],
  priceRange,      // pass only when user touched slider
  airframeRange,
  engineRange,
}) {
  const pageSize = ITEMS_PER_PAGE;

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

    // normalize data for UI
    select: (raw) => {
      const list = Array.isArray(raw?.data) ? raw.data : [];
      const cleaned = list.filter((r) => r && r._id);

      const mapped = cleaned.map((r) => ({
        _id: r._id,
        title: r.title,
        year: r.year,
        price: Number(r.price || 0),
        category: r.status, // "for-sale" | ...
        aircraft: (r?.category?.slug || "").toLowerCase(),
        airframe: Number(r.airframe),
        engine: Number(r.engine),
        propeller: Number(r.propeller),
        images: Array.isArray(r.images) ? r.images : [],
        location: r.location,
        raw: r,
      }));

      const totalFromServer = Number(
        raw?.totalItems ?? raw?.total ?? raw?.count ?? raw?.meta?.total
      );
      const serverTotalItems =
        Number.isFinite(totalFromServer) && totalFromServer >= 0
          ? totalFromServer
          : mapped.length;

      return { rows: mapped, serverTotalItems };
    },

    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });
}
