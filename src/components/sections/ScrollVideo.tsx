"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [shouldLockHero, setShouldLockHero] = useState(false);

  useEffect(() => {
    if (isFinished && shouldLockHero) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
      }, 2500); // Lock for 2.5 seconds
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isFinished, shouldLockHero]);

  useEffect(() => {
    if (window.scrollY > 100) {
      setIsFinished(true);
      return;
    }

    if (isFinished) return; // Don't attach scrubbing listeners if finished!

    let targetTime = 0;
    let currentTime = 0;
    let animationFrameId: number;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Lock native scrolling
      setHasScrolled(true);

      if (!videoRef.current || !videoRef.current.duration) return;
      
      // We translate the scroll distance into a strict video time delta
      // with a hard cap to ensure it can never scrub too fast.
      const scrubSpeed = 0.003; 
      let timeDelta = e.deltaY * scrubSpeed;
      
      // Hard speed limit per wheel event
      const maxDelta = 0.15;
      if (timeDelta > maxDelta) timeDelta = maxDelta;
      if (timeDelta < -maxDelta) timeDelta = -maxDelta;

      targetTime += timeDelta;
      
      if (targetTime < 0) targetTime = 0;
      if (targetTime > videoRef.current.duration) {
        targetTime = videoRef.current.duration;
      }
    };

    let lastTouchY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Lock native scrolling on mobile
      setHasScrolled(true);
      if (!videoRef.current || !videoRef.current.duration) return;

      const touchY = e.touches[0].clientY;
      const deltaY = lastTouchY - touchY;
      lastTouchY = touchY;

      // Mobile scrub speed
      const scrubSpeed = 0.006; 
      let timeDelta = deltaY * scrubSpeed;
      
      const maxDelta = 0.15;
      if (timeDelta > maxDelta) timeDelta = maxDelta;
      if (timeDelta < -maxDelta) timeDelta = -maxDelta;

      targetTime += timeDelta;
      if (targetTime < 0) targetTime = 0;
      if (targetTime > videoRef.current.duration) {
        targetTime = videoRef.current.duration;
      }
    };

    const renderLoop = () => {
      if (videoRef.current) {
        // Smoothly glide towards the target time
        currentTime += (targetTime - currentTime) * 0.08;
        videoRef.current.currentTime = currentTime;

        // If we reach the very end of the video, we unlock the page!
        if (currentTime >= videoRef.current.duration - 0.05) {
           setShouldLockHero(true);
           setIsFinished(true);
           return;
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // We must use passive: false to allow e.preventDefault()
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    
    renderLoop();
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isFinished]);

  if (isFinished) return null;

  return (
    <div className="fixed inset-0 z-[100] h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        src="/optimized_video.mp4"
        className="h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0.01;
          }
        }}
      />
      
      {/* 'Scroll down' tiny text overlay that disappears when scrolling starts */}
      <div 
        className={`absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none transition-opacity duration-700 ${hasScrolled ? 'opacity-0' : 'opacity-100'}`}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
          Scroll down
        </p>
      </div>

      {/* Skip Intro Button */}
      <button
        onClick={() => {
          setShouldLockHero(true);
          setIsFinished(true);
        }}
        className="absolute bottom-8 right-8 z-50 group flex items-center gap-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40"
      >
        Skip Intro
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}
