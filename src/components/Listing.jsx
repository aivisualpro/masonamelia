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
import {
  useAircraftsQuery,
  useRangesQuery,
  buildUrl,
  ITEMS_PER_PAGE,
} from "../hooks/useAircraftsQuery";
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

export default function Listing() {
  const sectionRef = useRef(null);
  const queryClient = useQueryClient();

  // ui
  const [filterOpen, setFilterOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // filters (state to send to server)
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [priceRange, setPriceRange] = useState(undefined);
  const [airframeRange, setAirframeRange] = useState(undefined);
  const [engineRange, setEngineRange] = useState(undefined);

  // touched flags (VERY IMPORTANT)
  const [priceTouched, setPriceTouched] = useState(false);
  const [airframeTouched, setAirframeTouched] = useState(false);
  const [engineTouched, setEngineTouched] = useState(false);

  // tabs + pagination
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // categories for checkbox list
  const { data: aircraftOptions = [], isLoading: catsLoading } =
    useCategoriesQuery();

  /* ---------- NEW: fetch slider domains from /ranges ---------- */
  const { data: ranges, isLoading: rangesLoading } = useRangesQuery({
    status: activeTab,
    categories: selectedFilters,
  });

  const minPrice = ranges?.minPrice ?? 0;
  const maxPrice = ranges?.maxPrice ?? 0;
  const minAirframe = ranges?.minAirframe ?? 0;
  const maxAirframe = ranges?.maxAirframe ?? 0;
  const minEngine = ranges?.minEngine ?? 0;
  const maxEngine = ranges?.maxEngine ?? 0;

  // fetch aircrafts (send filters only if touched)
  const {
    data: api,
    isPending,
    isFetching,
    error,
  } = useAircraftsQuery({
    status: activeTab,
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
    categories: selectedFilters,
    priceRange: priceTouched ? priceRange : undefined,
    airframeRange: airframeTouched ? airframeRange : undefined,
    engineRange: engineTouched ? engineRange : undefined,
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

  // dataset key (status + categories)
  const domainKey = useMemo(
    () => `${activeTab}|${[...selectedFilters].sort().join(",")}`,
    [activeTab, selectedFilters]
  );
  const lastDomainKey = useRef(null);

  // reset on dataset change
  useEffect(() => {
    if (lastDomainKey.current !== domainKey) {
      lastDomainKey.current = domainKey;
      setCurrentPage(1);
      setPriceRange(undefined);
      setAirframeRange(undefined);
      setEngineRange(undefined);
      setPriceTouched(false);
      setAirframeTouched(false);
      setEngineTouched(false);
    }
  }, [domainKey]);

  // reset page when actual filter values change (only if touched)
  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeTab,
    JSON.stringify(selectedFilters),
    priceTouched ? JSON.stringify(priceRange || []) : "untouched-price",
    airframeTouched
      ? JSON.stringify(airframeRange || [])
      : "untouched-airframe",
    engineTouched ? JSON.stringify(engineRange || []) : "untouched-engine",
  ]);

  // scroll helper
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

  // prefetch next page
  useEffect(() => {
    const next = currentPage + 1;
    if (next > totalPages) return;
    const url = buildUrl({
      status: activeTab,
      page: next,
      pageSize: ITEMS_PER_PAGE,
      categories: selectedFilters,
      priceRange: priceTouched ? priceRange : undefined,
      airframeRange: airframeTouched ? airframeRange : undefined,
      engineRange: engineTouched ? engineRange : undefined,
    });
    queryClient.prefetchQuery({
      queryKey: [
        "aircrafts",
        {
          status: activeTab,
          page: next,
          pageSize: ITEMS_PER_PAGE,
          categories: selectedFilters,
          priceRange: priceTouched ? priceRange : null,
          airframeRange: airframeTouched ? airframeRange : null,
          engineRange: engineTouched ? engineRange : null,
        },
      ],
      queryFn: async ({ signal }) => {
        const { data } = await axios.get(url, {
          signal,
          withCredentials: false,
        });
        return data;
      },
    });
  }, [
    activeTab,
    currentPage,
    totalPages,
    queryClient,
    selectedFilters,
    priceTouched,
    airframeTouched,
    engineTouched,
    priceRange,
    airframeRange,
    engineRange,
  ]);

  // handlers mark as touched
  const onPriceChange = useCallback((range) => {
    setPriceRange([Number(range?.[0] || 0), Number(range?.[1] || 0)]);
    setPriceTouched(true);
  }, []);
  const onAirframeChange = useCallback((range) => {
    setAirframeRange([Number(range?.[0] || 0), Number(range?.[1] || 0)]);
    setAirframeTouched(true);
  }, []);
  const onEngineChange = useCallback((range) => {
    setEngineRange([Number(range?.[0] || 0), Number(range?.[1] || 0)]);
    setEngineTouched(true);
  }, []);

  return (
    <section
      id="showroom"
      ref={sectionRef}
      className="bg-[#111218] relative z-[10] py-10"
    >
      <div className="container px-6">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-white pt-10">
            Explore Our Aircraft Collection
          </h1>
          <p className="text-white text-base max-w-3xl mx-auto mt-2">
            Browse a curated inventory of premium aircraft tailored for diverse
            missions and budgets.
          </p>
        </div>

        {/* Tabs */}
        <div className="lg:block hidden animated-tabs mb-12">
          <Tabs
            categories={STATUS_TABS}
            activeTab={activeTab}
            setActiveTab={(slug) => slug !== activeTab && setActiveTab(slug)}
            isAllTab={true}
            showFilterToggle
            isFilterOpen={filterOpen}
            onToggleFilter={() => setFilterOpen((v) => !v)}
          />
        </div>

        {/* Mobile filter toggle */}
        <div className="filter mb-4 lg:hidden flex justify-end">
          <IoFilterSharp />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white flex items-center gap-2"
          >
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
                <FilterCheckboxList
                  selected={selectedFilters}
                  setSelected={setSelectedFilters}
                  // price slider domain from /ranges
                  range={priceRange ?? [minPrice, maxPrice]}
                  setRange={onPriceChange}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  // airframe slider domain from /ranges
                  airframeRange={airframeRange ?? [minAirframe, maxAirframe]}
                  setAirframeRange={onAirframeChange}
                  minAirframe={minAirframe}
                  maxAirframe={maxAirframe}
                  engineRange={engineRange ?? [minEngine, maxEngine]}
                  setEngineRange={onEngineChange}
                  minEngine={minEngine}
                  maxEngine={maxEngine}
                  aircraftOptions={aircraftOptions}
                />
              </motion.div>
            </motion.aside>
          )}

          {/* Mobile drawer */}
          <div className="block">
            <FilterSideBar
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              priceRange={priceRange ?? [minPrice, maxPrice]}
              setPriceRange={onPriceChange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              airframeRange={airframeRange ?? [minAirframe, maxAirframe]}
              setAirframeRange={onAirframeChange}
              minAirframe={minAirframe}
              maxAirframe={maxAirframe}
              engineRange={engineRange ?? [minEngine, maxEngine]}
              setEngineRange={onEngineChange}
              minEngine={minEngine}
              maxEngine={maxEngine}
              categories={STATUS_TABS}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              aircraftOptions={aircraftOptions}
            />
          </div>

          {/* Cards + pagination */}
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className={`w-full ${
              filterOpen ? "lg:w-[70%] lg:ms-[5%]" : "lg:w-full lg:ms-0"
            }`}
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
                  className={`grid grid-cols-1 sm:grid-cols-2 ${
                    filterOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
                  } gap-8`}
                >
                  {rows.map((airplane) => (
                    <Card key={airplane._id} detail={airplane} />
                  ))}
                </motion.div>

                <div className="flex justify-center mt-10">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, value) =>
                      value !== currentPage && setCurrentPage(value)
                    }
                    color="primary"
                  />
                </div>

                <div className="mt-4 text-center text-white/60 text-sm">
                  {meta.totalItems || 0} results • Page {currentPage} /{" "}
                  {totalPages}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
