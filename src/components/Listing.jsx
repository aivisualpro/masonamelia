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
import { PuffLoader } from "react-spinners";

const ITEMS_PER_PAGE = 16;

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
  const [airframeRange, setAirframeRange] = useState(null);
  const [engineRange, setEngineRange] = useState(null);

  // price filter control
  const [priceTouched, setPriceTouched] = useState(false);
  const [priceDefault, setPriceDefault] = useState([0, 0]);

  // tabs + pagination
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // data + meta
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

  // fetch
  const {
    data: apiData,
    isPending,
    isFetching,
    error,
  } = useAircraftsQuery({
    status: activeTab,
    page: currentPage,
    categories: selectedFilters, // ["beechcraft","piper",...]
    priceRange: priceTouched ? priceRange : undefined, // sirf jab user ne touch kiya ho
    airframeRange,
    engineRange,
  });

  useEffect(() => {
    setLoading(isPending || isFetching);
    setErrMsg(error?.message || "");
    if (apiData) {
      setRows(apiData.rows);
      setServerTotalItems(apiData.serverTotalItems);
    }
  }, [apiData, isPending, isFetching, error]);

  // prefetch next page (all tab)
  useEffect(() => {
    if (activeTab !== "all") return;
    const next = currentPage + 1;
    const url = buildUrl({
      status: activeTab,
      page: next,
      pageSize: ITEMS_PER_PAGE,
    });
    queryClient.prefetchQuery({
      queryKey: [
        "aircrafts",
        { status: activeTab, page: next, pageSize: ITEMS_PER_PAGE },
      ],
      queryFn: async ({ signal }) => {
        const { data } = await axios.get(url, {
          signal,
          withCredentials: false,
        });
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
    () => uniqSortedStrings(rows.map((a) => a.aircraft?.toLowerCase().trim())),
    [rows]
  );

  // price bounds from current page
  const allPrices = useMemo(
    () => rows.map((a) => Number(a.price || 0)),
    [rows]
  );
  const minPrice = allPrices.length ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length ? Math.max(...allPrices) : 0;

  // 🔧 keep price slider synced to data bounds,
  // but DO NOT override if the user has touched the slider.
  useEffect(() => {
    if (currentPage === 1 && !priceTouched) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice, priceTouched]);

  // capture "default" price range (tab start / page 1)
  useEffect(() => {
    if (allPrices.length) setPriceDefault([minPrice, maxPrice]);
  }, [activeTab, currentPage, allPrices.length, minPrice, maxPrice]);

  const setPriceRangeTouched = useCallback((v) => {
    setPriceTouched(true);
    setPriceRange(v);
  }, []);

  // if user expands back to cover default => clear touched
  useEffect(() => {
    if (!priceTouched) return;
    const [d0, d1] = priceDefault;
    const r0 = Number(priceRange?.[0] ?? d0);
    const r1 = Number(priceRange?.[1] ?? d1);
    if (r0 <= d0 && r1 >= d1) setPriceTouched(false);
  }, [priceRange, priceDefault, priceTouched]);

  // defer
  const deferredSelected = useDeferredValue(selectedFilters);
  const deferredPrice = useDeferredValue(priceRange);

  // client-side filter within current server page (unchanged UI)
  const filteredRows = useMemo(() => {
    const sel = new Set(
      (deferredSelected || []).map((s) => String(s).toLowerCase().trim())
    );
    const chosenBrands = aircraftOptions.filter((v) => sel.has(v));

    const [effMin, effMax] = [
      Number(deferredPrice?.[0] ?? minPrice),
      Number(deferredPrice?.[1] ?? maxPrice),
    ];

    return rows.filter((a) => {
      const priceOk = Number(a.price) >= effMin && Number(a.price) <= effMax;
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
        chosenBrands.includes(
          String(a.aircraft || "")
            .toLowerCase()
            .trim()
        );

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
  }, [
    selectedFilters,
    airframeRange,
    engineRange,
    priceTouched,
    priceRange,
    priceDefault,
  ]);

  const clientAwareTotalItems = hasAnyClientFilter
    ? filteredRows.length
    : serverTotalItems;

  const totalPages = useMemo(() => {
    return Math.max(
      1,
      Math.ceil(Number(serverTotalItems || 0) / ITEMS_PER_PAGE)
    );
  }, [serverTotalItems]);

  // clamp if filters shrink total pages
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  // reset page to 1 when tab or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedFilters, priceRange, airframeRange, engineRange]);

  // Smooth scroll AFTER page data loads
  useEffect(() => {
    if (loading) return;
    const id = requestAnimationFrame(() => {
      const el = sectionRef.current;
      if (!el) return;
      scrollToSectionTop();
    });
    return () => cancelAnimationFrame(id);
  }, [currentPage, loading]);

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
                setPriceTouched(false);
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
                  key={`flt-${activeTab}-${currentPage}`} // ✅ force remount per tab/page
                  selected={selectedFilters}
                  setSelected={setSelectedFilters}
                  range={priceRange}
                  setRange={setPriceRangeTouched}
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
                <PuffLoader color="#ffffff" size={50} />
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
                  {filteredRows.map((airplane) => (
                    <Card key={airplane._id} detail={airplane} />
                  ))}
                </motion.div>

                <div className="flex justify-center mt-10">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, value) => {
                      if (value !== currentPage) setCurrentPage(value);
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
