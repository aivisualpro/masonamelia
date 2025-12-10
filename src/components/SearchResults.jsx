// src/pages/SearchResults.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FullscreenSpinner from "./FullScreenSpinner";
import Card from "./Card";
import Listing from "./Listing";

const API_BASE = import.meta.env.VITE_BASE_URL;
const SEARCH_URL = `${API_BASE}/api/aircrafts/lists/search`;

const LIMIT = 12; // page size for grid

// If you already have a <Card/> for aircraft, import it and use it below.
export default function SearchResults() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const q = (params.get("q") || "").trim();

  return (
    <div className="container px-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-semibold text-white/90">
          {q ? <>Results for “{q}”</> : "All Aircraft"}
        </h1>
      </div>
      <Listing q={q} />
    </div>
  );
}
