"use client";
import { useRef, useState, useEffect } from "react";

function ChildScrollPosition() {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const scrollTop = container.scrollTop;
        setScrollPosition(scrollTop);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "200vh", // Child element with overflow
          position: "absolute",
          width: "100%",
        }}
      >
        {/* Your content here */}
      </div>
      <p>Scroll position: {scrollPosition}</p>
    </div>
  );
}

export default ChildScrollPosition;
