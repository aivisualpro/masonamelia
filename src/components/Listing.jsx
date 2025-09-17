// Listing.jsx
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import FilterCheckboxList from "./FilterCheckboxList";
import Card from "./Card";
import Tabs from "./Tabs";
import Pagination from "./Pagination";
import FilterSideBar from "./FilterSideBar";
import { IoFilterSharp } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAircraftsQuery, buildUrl, ITEMS_PER_PAGE } from "../hooks/useAircraftsQuery";
import { useCategoriesQuery } from "../hooks/useCategoriesQuery";
import { PuffLoader } from "react-spinners";

const STATUS_TABS = [
  { name: "For Sale", slug: "for-sale" },
  { name: "Wanted", slug: "wanted" },
  { name: "Coming Soon", slug: "coming-soon" },
  { name: "Sale Pending", slug: "sale-pending" },
  { name: "Off Market", slug: "off-market" },
  { name: "Acquired", slug: "acquired" },
  { name: "Sold", slug: "sold" },
];

const uniq = (arr) => Array.from(new Set(arr));
const uniqSortedNums = (arr) =>
  uniq(arr.filter((n) => Number.isFinite(n))).sort((a, b) => a - b);

export default function Listing() {
  const sectionRef = useRef(null);
  const queryClient = useQueryClient();

  // ui
  const [filterOpen, setFilterOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // filters → server
  const [selectedFilters, setSelectedFilters] = useState([]);  // category slugs
  const [priceRange, setPriceRange] = useState(undefined);     // [min,max]
  const [airframeRange, setAirframeRange] = useState(undefined);
  const [engineRange, setEngineRange] = useState(undefined);

  // tabs + pagination
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // categories for checkbox list
  const { data: aircraftOptions = [], isLoading: catsLoading } = useCategoriesQuery();

  // fetch aircrafts (server filters)
  const { data: api, isPending, isFetching, error } = useAircraftsQuery({
    status: activeTab,
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
    categories: selectedFilters,
    priceRange,
    airframeRange,
    engineRange,
  });

  // keep page in sync with backend clamped page (if any)
  useEffect(() => {
    const p = api?.meta?.page;
    if (p && p !== currentPage) setCurrentPage(p);
  }, [api?.meta?.page]);

  const loading = isPending || isFetching;
  const rows = api?.rows || [];
  const meta = api?.meta || {};
  const totalPages = meta.pageCount || 1;
  const errMsg = error?.message || "";

  // ---------- DOMAIN (STABLE) STATE ----------
  // A key that changes when the *dataset* should change.
  // We intentionally do NOT include price/airframe/engine ranges here.
  const domainKey = useMemo(
    () => `${activeTab}|${[...selectedFilters].sort().join(",")}`,
    [activeTab, selectedFilters]
  );
  const lastDomainKey = useRef(null);

  const [stableMinPrice, setStableMinPrice] = useState(0);
  const [stableMaxPrice, setStableMaxPrice] = useState(0);
  const [stableAirframeOptions, setStableAirframeOptions] = useState([]);
  const [stableEngineOptions, setStableEngineOptions] = useState([]);

  // When dataset (status/categories) change, mark domain as uninitialized
  useEffect(() => {
    if (lastDomainKey.current !== domainKey) {
      lastDomainKey.current = domainKey;
      // wipe prior domain so we can re-derive from the next loaded rows
      setStableMinPrice(0);
      setStableMaxPrice(0);
      setStableAirframeOptions([]);
      setStableEngineOptions([]);
      // also reset page to 1 to fetch the canonical first page for this dataset
      setCurrentPage(1);
    }
  }, [domainKey]);

  // Initialize stable domain once per dataset change (from whatever rows we have).
  useEffect(() => {
    // If already initialized for this dataset, do nothing.
    if (stableAirframeOptions.length || stableEngineOptions.length || (stableMaxPrice > 0)) {
      return;
    }
    const prices = rows.map((a) => Number(a.price || 0)).filter(Number.isFinite);
    const airframes = uniqSortedNums(rows.map((a) => Number(a.airframe)));
    const engines = uniqSortedNums(rows.map((a) => Number(a.engine)));

    if (prices.length) {
      setStableMinPrice(Math.min(...prices));
      setStableMaxPrice(Math.max(...prices));
    } else {
      setStableMinPrice(0);
      setStableMaxPrice(0);
    }
    setStableAirframeOptions(airframes);
    setStableEngineOptions(engines);

    // If user hasn't touched price yet, ensure visible range spans full domain
    setPriceRange((prev) => prev ?? (prices.length ? [Math.min(...prices), Math.max(...prices)] : undefined));
    // Similarly, if discrete ranges are unset, keep them undefined (parent just sends undefined)
  }, [rows, stableAirframeOptions.length, stableEngineOptions.length, stableMaxPrice]);

  // ---------- RESET PAGE ON FILTER CHANGES (but not while typing) ----------
  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeTab,
    JSON.stringify(selectedFilters),
    JSON.stringify(priceRange || []),
    JSON.stringify(airframeRange || []),
    JSON.stringify(engineRange || []),
  ]);

  // scroll helpers
  const scrollToTop = useCallback((offset = 80) => {
    const el = sectionRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y + 60, behavior: "smooth" });
  }, []);
  useEffect(() => {
    if (!loading) {
      const id = requestAnimationFrame(() => scrollToTop());
      return () => cancelAnimationFrame(id);
    }
  }, [currentPage, loading, scrollToTop]);

  // prefetch next page (nice-to-have)
  useEffect(() => {
    const next = currentPage + 1;
    if (next > totalPages) return;
    const url = buildUrl({
      status: activeTab,
      page: next,
      pageSize: ITEMS_PER_PAGE,
      categories: selectedFilters,
      priceRange,
      airframeRange,
      engineRange,
    });
    queryClient.prefetchQuery({
      queryKey: [
        "aircrafts",
        {
          status: activeTab,
          page: next,
          pageSize: ITEMS_PER_PAGE,
          categories: selectedFilters,
          priceRange: priceRange ?? null,
          airframeRange: airframeRange ?? null,
          engineRange: engineRange ?? null,
        },
      ],
      queryFn: async ({ signal }) => {
        const { data } = await axios.get(url, { signal, withCredentials: false });
        return data;
      },
    });
  }, [activeTab, currentPage, totalPages, queryClient, selectedFilters, priceRange, airframeRange, engineRange]);

  // price slider handler (server-side filtering)
  const setPriceRangeTouched = useCallback((range) => {
    setPriceRange([Number(range?.[0] || 0), Number(range?.[1] || 0)]);
  }, []);

  return (
    <section id="showroom" ref={sectionRef} className="bg-[#111218] relative z-[10] py-10">
      <div className="container px-6">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-white pt-10">Explore Our Aircraft Collection</h1>
          <p className="text-white text-base max-w-3xl mx-auto mt-2">
            Browse a curated inventory of premium aircraft tailored for diverse missions and budgets.
          </p>
        </div>

        {/* Tabs */}
        <div className="lg:block hidden animated-tabs mb-12">
          <Tabs
            categories={STATUS_TABS}
            activeTab={activeTab}
            setActiveTab={(slug) => {
              if (slug !== activeTab) {
                setActiveTab(slug);
                // keep user-selected ranges; domains will re-init for the new dataset
              }
            }}
            isAllTab={true}
            showFilterToggle
            isFilterOpen={filterOpen}
            onToggleFilter={() => setFilterOpen((v) => !v)}
          />
        </div>

        {/* Mobile filter toggle */}
        <div className="filter mb-4 lg:hidden flex justify-end">
          <IoFilterSharp />
          <button onClick={() => setIsOpen(!isOpen)} className="text-white flex items-center gap-2">
            Filter
          </button>
        </div>

        <div className="flex">
          {/* Desktop filters */}
          {filterOpen && (
            <motion.aside
              key="filter"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100%", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="hidden lg:block overflow-hidden pe-4 w-[25%]"
            >
              <motion.div
                layout
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-[#ffffff48] p-0 bg-transparent"
              >
                {catsLoading ? (
                  <div className="p-6 text-white/70 text-sm">Loading categories…</div>
                ) : (
                  <FilterCheckboxList
                    key={`flt-${activeTab}-${currentPage}-${domainKey}`}
                    selected={selectedFilters}
                    setSelected={setSelectedFilters}
                    // ----- use STABLE price domain -----
                    range={priceRange ?? (stableMaxPrice ? [stableMinPrice, stableMaxPrice] : [0, 0])}
                    setRange={setPriceRangeTouched}
                    minPrice={stableMinPrice}
                    maxPrice={stableMaxPrice}
                    // ----- use STABLE discrete domains -----
                    airframeOptions={stableAirframeOptions}
                    engineOptions={stableEngineOptions}
                    aircraftOptions={aircraftOptions}
                    airframeRange={airframeRange}
                    setAirframeRange={setAirframeRange}
                    engineRange={engineRange}
                    setEngineRange={setEngineRange}
                  />
                )}
              </motion.div>
            </motion.aside>
          )}

          {/* Mobile drawer */}
          <div className="block">
            <FilterSideBar
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              priceRange={priceRange ?? (stableMaxPrice ? [stableMinPrice, stableMaxPrice] : [0, 0])}
              setPriceRange={setPriceRangeTouched}
              minPrice={stableMinPrice}
              maxPrice={stableMaxPrice}
              categories={STATUS_TABS}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              airframeOptions={stableAirframeOptions}
              engineOptions={stableEngineOptions}
              aircraftOptions={aircraftOptions}
              airframeRange={airframeRange}
              setAirframeRange={setAirframeRange}
              engineRange={engineRange}
              setEngineRange={setEngineRange}
            />
          </div>

          {/* Cards + pagination */}
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className={`w-full ${filterOpen ? "lg:w-[70%] lg:ms-[5%]" : "lg:w-full lg:ms-0"}`}
          >
            {loading ? (
              <div className="flex justify-center items-center py-24">
                <PuffLoader color="#ffffff" size={50} />
              </div>
            ) : errMsg ? (
              <div className="flex justify-center items-center py-24">
                <p className="text-red-400">Error: {errMsg}</p>
              </div>
            ) : rows.length === 0 ? (
              <div className="flex justify-center items-center">
                <p className="text-white text-lg">No data found.</p>
              </div>
            ) : (
              <>
                <motion.div
                  layout
                  transition={{ duration: 0.2 }}
                  className={`grid grid-cols-1 sm:grid-cols-2 ${filterOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-8`}
                >
                  {rows.map((airplane) => (
                    <Card key={airplane._id} detail={airplane} />
                  ))}
                </motion.div>

                <div className="flex justify-center mt-10">
                  <Pagination
                    count={totalPages}
                    page={ currentPage}
                    onChange={(_, value) => {
                      if (value !== currentPage) setCurrentPage(value);
                    }}
                    color="primary"
                  />
                </div>

                <div className="mt-4 text-center text-white/60 text-sm">
                  {meta.totalItems || 0} results • Page {currentPage} / {totalPages}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
