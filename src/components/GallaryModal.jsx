import React, { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";

/* ─── Genie animation helpers ─── */
const getGenieOrigin = (rect) => {
  if (!rect) return { x: 0, y: 0, scaleX: 0.3, scaleY: 0.3 };
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Calculate where the source center is relative to viewport center
  const srcCenterX = rect.left + rect.width / 2;
  const srcCenterY = rect.top + rect.height / 2;
  const offsetX = srcCenterX - vw / 2;
  const offsetY = srcCenterY - vh / 2;
  const scaleX = Math.max(rect.width / vw, 0.05);
  const scaleY = Math.max(rect.height / vh, 0.05);
  return { x: offsetX, y: offsetY, scaleX, scaleY };
};

const GalleryModal = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
  sourceRect,
}) => {
  const total = images?.length || 0;
  const [genieOrigin, setGenieOrigin] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  // Calculate genie origin when opening
  useEffect(() => {
    if (isOpen && sourceRect) {
      setGenieOrigin(getGenieOrigin(sourceRect));
    }
  }, [isOpen, sourceRect]);

  const goNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total, setCurrentIndex]);

  const goPrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total, setCurrentIndex]);

  // Close with genie reverse
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 450);
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, handleClose, goNext, goPrev]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!images || images.length === 0) return null;

  const origin = genieOrigin || { x: 0, y: 0, scaleX: 0.3, scaleY: 0.3 };

  // Genie variants for the fullscreen container
  const genieVariants = {
    hidden: {
      opacity: 0,
      scale: 0.15,
      x: origin.x,
      y: origin.y,
      borderRadius: "20px",
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      borderRadius: "0px",
      filter: "blur(0px)",
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1], // custom spring-like ease
        opacity: { duration: 0.3 },
        filter: { duration: 0.4 },
        borderRadius: { duration: 0.4 },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.15,
      x: origin.x,
      y: origin.y,
      borderRadius: "20px",
      filter: "blur(8px)",
      transition: {
        duration: 0.45,
        ease: [0.55, 0, 1, 0.45], // ease-in for closing
        opacity: { duration: 0.35 },
        filter: { duration: 0.3 },
      },
    },
  };

  // Backdrop variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4, delay: 0.05 },
    },
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && !isClosing && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[999998] bg-black/95"
            onClick={handleClose}
          />

          {/* Genie container */}
          <motion.div
            key="genie-modal"
            variants={genieVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[999999] overflow-hidden"
            style={{ transformOrigin: "center center" }}
          >
            {/* Full-screen image */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              onClick={handleClose}
            >
              <div onClick={(e) => e.stopPropagation()} className="w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-contain select-none"
                    draggable={false}
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Top bar: counter + close */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 md:px-6 py-3 z-10 bg-gradient-to-b from-black/60 to-transparent"
            >
              <span className="text-white/70 text-sm font-medium tracking-wider">
                {currentIndex + 1} / {total}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="bg-white text-black hover:bg-white/80 transition-all duration-200 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
                aria-label="Close gallery"
              >
                <IoClose size={20} />
              </button>
            </motion.div>

            {/* Left arrow */}
            {total > 1 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 
                  w-10 h-10 md:w-12 md:h-12 rounded-full 
                  bg-black/40 hover:bg-black/60 backdrop-blur-sm
                  border border-white/10 hover:border-white/25
                  flex items-center justify-center 
                  text-white/80 hover:text-white
                  transition-all duration-300
                  hover:scale-110 active:scale-95 group"
                aria-label="Previous image"
              >
                <IoIosArrowBack size={20} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              </motion.button>
            )}

            {/* Right arrow */}
            {total > 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 
                  w-10 h-10 md:w-12 md:h-12 rounded-full 
                  bg-black/40 hover:bg-black/60 backdrop-blur-sm
                  border border-white/10 hover:border-white/25
                  flex items-center justify-center 
                  text-white/80 hover:text-white
                  transition-all duration-300
                  hover:scale-110 active:scale-95 group"
                aria-label="Next image"
              >
                <IoIosArrowForward size={20} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </motion.button>
            )}

            {/* Bottom thumbnail strip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="absolute bottom-0 left-0 right-0 z-10 px-4 md:px-6 py-3 bg-gradient-to-t from-black/70 to-transparent overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`flex-shrink-0 rounded-md overflow-hidden transition-all duration-300 
                      ${i === currentIndex
                        ? "ring-2 ring-[#1777cb] opacity-100 scale-105"
                        : "opacity-40 hover:opacity-80 hover:scale-105"
                      }`}
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-14 h-10 md:w-16 md:h-11 object-cover"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default GalleryModal;
