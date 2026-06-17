const ShinyText = ({ isTextCenter = true, text, color = "text-[#b5b5b5a4]", disabled = false, speed = 5, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`${color} ${isTextCenter ? "text-center" : "text-start"} bg-clip-text inline-block ${
        disabled ? "" : "animate-shine"
      } ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
      }}
    >
      {typeof text === "string" ? text.split("\n").map((line, i, arr) => (
        <span key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      )) : text}
    </div>
  );
};

export default ShinyText;
