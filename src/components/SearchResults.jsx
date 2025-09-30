// src/pages/SearchResults.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FullscreenSpinner from "./FullScreenSpinner";
import Card from "./Card";

const API_BASE = import.meta.env.VITE_BASE_URL;
const SEARCH_URL = `${API_BASE}/api/aircrafts/lists/search`;

const LIMIT = 12; // page size for grid

// If you already have a <Card/> for aircraft, import it and use it below.
export default function SearchResults() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const q = (params.get("q") || "").trim();
  const page = Math.max(parseInt(params.get("page") || "1", 10), 1);

  const pageCount = useMemo(() => {
    // If API returns total pages directly, you can just use it.
    // Otherwise compute from `total` and LIMIT.
    return Math.max(1, Math.ceil((total || 0) / LIMIT));
  }, [total]);

  useEffect(() => {
    // redirect to all showroom if query missing? Optional:
    // if (!q) navigate("/showroom", { replace: true });
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError("");

        const url = new URL(SEARCH_URL);
        if (q) url.searchParams.set("q", q);
        url.searchParams.set("page", String(page));
        url.searchParams.set("limit", String(LIMIT));

        const res = await fetch(url.toString(), { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Try common API shapes
        const list = data?.data || data?.results || data?.items || [];
        const totalFromApi =
          data?.total ??
          data?.totalDocs ??
          data?.count ??
          data?.meta?.total ??
          (Array.isArray(list) ? list.length : 0);

        setItems(list);
        setTotal(Number(totalFromApi) || 0);
      } catch (e) {
        if (e.name !== "AbortError") setError("Failed to load results");
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [q, page]);

  const handlePageChange = (_evt, newPage) => {
    params.set("page", String(newPage));
    setParams(params, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container px-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-semibold text-white/90">
          {q ? <>Results for “{q}”</> : "All Aircraft"}
        </h1>
        {!!total && (
          <div className="text-white/60">
            Page {page} / {pageCount} · {total.toLocaleString()} result{total !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {loading && (
        <FullscreenSpinner
        show={loading}
        text="Loading member…"
      />
      )}

      {!loading && error && (
        <div className="mt-8 text-red-300">{error}</div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="mt-8 text-white/70">No aircraft matched your search.</div>
      )}

      {!loading && !error && items.length > 0 && (
        <>
          {/* Use your existing <Card/> if available */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <Card key={item._id} detail={item} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Stack spacing={2}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
              />
            </Stack>
          </div>
        </>
      )}
    </div>
  );
}
