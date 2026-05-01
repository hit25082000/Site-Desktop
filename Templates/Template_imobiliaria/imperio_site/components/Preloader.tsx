"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setComplete(true),
    });

    tl.to(".loader-bar", { width: "100%", duration: 1.5, ease: "power2.inOut" })
      .to(".loader-text", { y: -50, opacity: 0, duration: 0.5 })
      .to(".loader-container", {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });
  }, []);

  if (complete) return null;

  return (
    <div className="loader-container fixed inset-0 bg-[#121212] z-[10000] flex flex-col justify-center items-center overflow-hidden">
      <div className="loader-text display text-white text-[5vw] font-bold tracking-tighter mix-blend-difference">
        CAPTA
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-white loader-bar w-0" />
    </div>
  );
}
