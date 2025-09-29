import { useEffect, useState } from "react";
import useOnceAfter from "../hooks/useOnceAfter";
import { RxCross2 } from "react-icons/rx";

/**
 * Subscribe popup with image background
 * - Shows 5s after first visit and then never again (localStorage).
 * - Close with ✕, ESC, or clicking the backdrop.
 */
export default function SubscribePopup({
  delayMs = 5000,
  storageKey = "subscribe_popup_seen",
  oncePerVisitor = true,
  imageUrl = "/images/popup.png",
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // show once per visitor after delay
  useEffect(() => {
    let timer;
    const seen =
      oncePerVisitor && typeof window !== "undefined"
        ? localStorage.getItem(storageKey)
        : null;

    if (!seen) {
      timer = setTimeout(() => setOpen(true), delayMs);
    }
    return () => clearTimeout(timer);
  }, [delayMs, oncePerVisitor, storageKey]);

  const close = () => {
    setOpen(false);
    try {
      if (oncePerVisitor) localStorage.setItem(storageKey, "1");
    } catch {}
  };

  // ESC to close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    const ok = /^\S+@\S+\.\S+$/.test(email);
    if (!ok) return setError("Please enter a valid email address.");
    setError("");
    // TODO: send to your API here
    console.log("Subscribed:", email);
    close();
  };

  useOnceAfter(5000, "subscribe_popup_seen", () => setOpen(true));

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div className="relative w-[500px] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
        {/* background + overlay */}
        <div className="absolute inset-0 bg-[url('/images/popup.png')] bg-cover bg-bottom" />
        <div className="absolute inset-0 bg-[#111218]/85" />
        {/* content */}
        <div className="relative p-6 text-white flex flex-col justify-center h-full">
          <button
            onClick={() => setOpen(false)}
            className="absolute flex items-center justify-center hover:bg-white/40 right-3 top-3 h-9 w-9 rounded-full bg-white/20"
          >
            <RxCross2 size={24} />
          </button>
          <h2 className="text-3xl font-extrabold tracking-wide text-center">
            SUBSCRIBE NOW
          </h2>
          <p className="mt-3 text-center text-white/90">
            To sign-up a free and amazing offers and other cool things stay with
            us and please subscribe us
          </p>
          <form className="mt-5 flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-12 rounded-full px-4 focus:outline-none text-slate-800 placeholder-slate-500"
            />
            <button className="h-12 px-6 rounded-full bg-rose-500 hover:bg-rose-600 font-extrabold">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
