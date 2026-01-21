'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TourHeaderProps {
  title?: string;
  logo?: string;
  url?: string;
  onLogoClick?: () => void;
  className?: string;
}

export function TourHeader({
  title = "Matterport Tour",
  logo,
  url,
  onLogoClick,
  className,
}: TourHeaderProps) {

  const handleHeaderClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full h-[56px] z-[9000] flex items-center bg-white border-b border-zinc-200 px-4",
        className
      )}
    >
      {/* Left: Title */}
      {title && (
        <div className="flex items-center">
          <h1
            className="font-semibold text-sm sm:text-lg text-zinc-900"
          >
            {title}
          </h1>
        </div>
      )}

      {/* Center: Logo */}
      {logo && (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <img
            src={logo}
            alt="Brand logo"
            className="h-8 sm:h-10 w-auto object-contain select-none cursor-pointer transition-opacity hover:opacity-80"
            draggable={false}
            onClick={handleHeaderClick}
          />
        </div>
      )}
    </header>
  );
}
