import { createPortal } from "react-dom";
import { PuffLoader } from "react-spinners";

export default function FullscreenSpinner({ show, text = "Loading…" }) {
  if (!show) return null;
  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center">
      <PuffLoader size={64} color="#fff" />
      <p className="mt-4 text-white/80">{text}</p>
    </div>,
    document.body
  );
}
