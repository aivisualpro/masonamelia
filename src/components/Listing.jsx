// Listing.jsx
import React, {
  useState,
  useEffect,
  useMemo,
  useDeferredValue,
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
import { useAircraftsQuery, buildUrl } from "../hooks/useAircraftsQuery";

const ITEMS_PER_PAGE = 16;

// fixed tabs (slugs must match your backend status values)
const STATUS_TABS = [
  { name: "For Sale", slug: "for-sale" },
  { name: "Wanted", slug: "wanted" },
  { name: "Coming Soon", slug: "coming-soon" },
  { name: "Sale Pending", slug: "sale-pending" },
  { name: "Off Market", slug: "off-market" },
  { name: "Acquired", slug: "acquired" },
  { name: "Sold", slug: "sold" },
];

// helpers
const uniq = (arr) => Array.from(new Set(arr));
const uniqSortedNums = (arr) =>
  uniq(arr.filter((n) => Number.isFinite(n))).sort((a, b) => a - b);
const uniqSortedStrings = (arr) =>
  uniq(arr.filter(Boolean).map((s) => String(s))).sort((a, b) =>
    a.localeCompare(b)
  );

export default function Listing() {
  const sectionRef = useRef(null);
  const queryClient = useQueryClient();

  // ui state
  const [filterOpen, setFilterOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // filters state
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [airframeRange, setAirframeRange] = useState(null); // [min,max] or null
  const [engineRange, setEngineRange] = useState(null); // [min,max] or null

  // price filter control
  const [priceTouched, setPriceTouched] = useState(false);
  const [priceDefault, setPriceDefault] = useState([0, 0]);

  // tabs + pagination
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // data + meta (UI-friendly local state)
  const [rows, setRows] = useState([]);
  const [serverTotalItems, setServerTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const scrollToSectionTop = (offset = 80) => {
    const el = sectionRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y + 60, behavior: "smooth" });
  };

  // ✅ Fetch via TanStack Query
  const { data: apiData, isPending, isFetching, error } = useAircraftsQuery({
    status: activeTab,
    page: currentPage,
  });

  // sync query state to local UI state
  useEffect(() => {
    setLoading(isPending || isFetching);
    setErrMsg(error?.message || "");
    if (apiData) {
      setRows(apiData.rows);
      setServerTotalItems(apiData.serverTotalItems);
    }
  }, [apiData, isPending, isFetching, error]);

  // (optional) prefetch next page for smoother "All" pagination
  useEffect(() => {
    if (activeTab !== "all") return;
    const next = currentPage + 1;
    const url = buildUrl({ status: "all", page: next, pageSize: ITEMS_PER_PAGE });
    queryClient.prefetchQuery({
      queryKey: ["aircrafts", { status: "all", page: next, pageSize: ITEMS_PER_PAGE }],
      queryFn: async ({ signal }) => {
        const { data } = await axios.get(url, { signal, withCredentials: false });
        return data;
      },
    });
  }, [activeTab, currentPage, queryClient]);

  // ===== derive options from current page =====
  const airframeOptions = useMemo(
    () => uniqSortedNums(rows.map((a) => a.airframe)),
    [rows]
  );
  const engineOptions = useMemo(
    () => uniqSortedNums(rows.map((a) => a.engine)),
    [rows]
  );
  const aircraftOptions = useMemo(
    () => uniqSortedStrings(rows.map((a) => a.aircraft)),
    [rows]
  );

  // price bounds from current page
  const allPrices = useMemo(() => rows.map((a) => Number(a.price || 0)), [rows]);
  const minPrice = allPrices.length ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length ? Math.max(...allPrices) : 0;

  // keep price slider synced to data bounds (safe: only on first page)
  useEffect(() => {
    if (currentPage === 1) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice, currentPage]);

  // capture "default" price range (tab start / page 1) and reset touched
  useEffect(() => {
    if (currentPage === 1 && allPrices.length) {
      setPriceDefault([minPrice, maxPrice]);
      setPriceTouched(false);
    }
  }, [activeTab, currentPage, allPrices.length, minPrice, maxPrice]);

  // wrapper to mark price as touched when user moves slider
  const setPriceRangeTouched = useCallback((v) => {
    setPriceTouched(true);
    setPriceRange(v);
  }, []);

  // if user expands range back to cover default, auto-untouch
  useEffect(() => {
    if (!priceTouched) return;
    const [d0, d1] = priceDefault;
    const [r0, r1] = [
      Number(priceRange?.[0] ?? d0),
      Number(priceRange?.[1] ?? d1),
    ];
    if (r0 <= d0 && r1 >= d1) setPriceTouched(false);
  }, [priceRange, priceDefault, priceTouched]);

  // defer heavy filter state
  const deferredSelected = useDeferredValue(selectedFilters);
  const deferredPrice = useDeferredValue(priceRange);

  // client-side filter ONLY within the current server page
  const filteredRows = useMemo(() => {
    const sel = new Set(deferredSelected);
    const chosenBrands = aircraftOptions.filter((v) => sel.has(v));

    return rows.filter((a) => {
      const priceOk =
        Number(a.price) >= Number(deferredPrice[0] ?? minPrice) &&
        Number(a.price) <= Number(deferredPrice[1] ?? maxPrice);

      const tabOk = activeTab === "all" || a.category === activeTab;

      const airframeOk =
        !airframeRange ||
        (Number(a.airframe) >= airframeRange[0] &&
          Number(a.airframe) <= airframeRange[1]);

      const engineOk =
        !engineRange ||
        (Number(a.engine) >= engineRange[0] &&
          Number(a.engine) <= engineRange[1]);

      const brandOk =
        chosenBrands.length === 0 ||
        chosenBrands.includes((a.aircraft || "").toLowerCase());

      return priceOk && tabOk && airframeOk && engineOk && brandOk;
    });
  }, [
    rows,
    deferredSelected,
    deferredPrice,
    aircraftOptions,
    activeTab,
    minPrice,
    maxPrice,
    airframeRange,
    engineRange,
  ]);

  // decide whether client-side filters are actually ON
  const hasAnyClientFilter = useMemo(() => {
    const hasChips = selectedFilters.length > 0;
    const airframeActive = !!airframeRange;
    const engineActive = !!engineRange;

    const [d0, d1] = priceDefault;
    const priceActive =
      priceTouched &&
      (Number(priceRange?.[0] ?? d0) > d0 ||
        Number(priceRange?.[1] ?? d1) < d1);

    return hasChips || airframeActive || engineActive || priceActive;
  }, [selectedFilters, airframeRange, engineRange, priceTouched, priceRange, priceDefault]);

  // UI total (for any "x results" text, if needed)
  const clientAwareTotalItems = hasAnyClientFilter
    ? filteredRows.length
    : serverTotalItems;

  // ✅ Pagination count: filters ON => filteredRows.length, OFF => serverTotalItems
  const totalPages = useMemo(() => {
    const base = hasAnyClientFilter ? filteredRows.length : serverTotalItems;
    return Math.max(1, Math.ceil(Number(base || 0) / ITEMS_PER_PAGE));
  }, [hasAnyClientFilter, filteredRows.length, serverTotalItems]);

  // clamp page if filters shrink total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // reset page to 1 when tab or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedFilters, priceRange, airframeRange, engineRange]);

  // Smooth scroll AFTER page data loads (arrows + numbers both)
  useEffect(() => {
    if (loading) return;
    const id = requestAnimationFrame(() => scrollToSectionTop());
    return () => cancelAnimationFrame(id);
  }, [currentPage, loading]);

  // optional: when results are very few, keep user near the top
  useEffect(() => {
    if (filteredRows.length > 0 && filteredRows.length < 4) {
      scrollToSectionTop();
    }
  }, [filteredRows.length]);

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
            setActiveTab={(slug) => {
              if (slug !== activeTab) {
                setActiveTab(slug);
                setSelectedFilters([]); // optional
                setAirframeRange(null);
                setEngineRange(null);
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
                  range={priceRange}
                  setRange={setPriceRangeTouched}   // << important
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  airframeOptions={airframeOptions}
                  engineOptions={engineOptions}
                  aircraftOptions={aircraftOptions}
                  airframeRange={airframeRange}
                  setAirframeRange={setAirframeRange}
                  engineRange={engineRange}
                  setEngineRange={setEngineRange}
                />
              </motion.div>
            </motion.aside>
          )}

          {/* Mobile drawer */}
          <div className="block">
            <FilterSideBar
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              priceRange={priceRange}
              setPriceRange={setPriceRangeTouched}
              minPrice={minPrice}
              maxPrice={maxPrice}
              categories={STATUS_TABS}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              airframeOptions={airframeOptions}
              engineOptions={engineOptions}
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
            className={`w-full ${
              filterOpen ? "lg:w-[70%] lg:ms-[5%]" : "lg:w-full lg:ms-0"
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center py-24">
                <p className="text-white/80">Loading aircraft…</p>
              </div>
            ) : errMsg ? (
              <div className="flex justify-center items-center py-24">
                <p className="text-red-400">Error: {errMsg}</p>
              </div>
            ) : filteredRows.length === 0 ? (
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
                  {[...filteredRows].map((airplane) => (
                    <Card key={airplane._id} detail={airplane} />
                  ))}
                </motion.div>

                <div className="flex justify-center mt-10">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, value) => {
                      if (value !== currentPage) {
                        setCurrentPage(value); // scroll happens after load
                      }
                    }}
                    color="primary"
                  />
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}