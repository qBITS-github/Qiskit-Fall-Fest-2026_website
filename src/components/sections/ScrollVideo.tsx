"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let targetTime = 0;
    let currentTime = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      if (!videoRef.current || !containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      let progress = -top / (height - windowHeight);
      progress = Math.max(0, Math.min(1, progress));
      
      if (videoRef.current.duration && isFinite(videoRef.current.duration)) {
        targetTime = videoRef.current.duration * progress;
      }
    };

    const renderLoop = () => {
      if (videoRef.current && Math.abs(targetTime - currentTime) > 0.01) {
        // Smoothly interpolate current time towards target time (lerp)
        currentTime += (targetTime - currentTime) * 0.1;
        videoRef.current.currentTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    renderLoop();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-bg z-50">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/optimized_scroll_video.mp4"
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0.01; // Force first frame
            }
          }}
        />
        
        {/* Overlay gradient so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

        {/* Scroll prompt */}
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center text-white pointer-events-none transition-opacity duration-500">
          <p className="font-mono text-xs uppercase tracking-[0.2em] mb-4">Scroll to begin</p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
