"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { LANGUAGES } from "@/lib/data/languages";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % LANGUAGES.length);
        setIsVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="editorial-container pt-16 sm:pt-24 pb-12 sm:pb-16">
      {/* Greeting pill */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full thin-border">
          <span
            className={`text-body-sm font-medium transition-all duration-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1"
            }`}
          >
            {LANGUAGES[currentIndex].greeting}
          </span>
          <span className="text-caption text-muted">
            · {LANGUAGES[currentIndex].name}
          </span>
        </div>
      </div>

      {/* Headline */}
      <h1 className="font-serif text-display-sm sm:text-display max-w-3xl mb-6">
        Software & AI Engineer.
        <br />
        Reader. Traveller.
      </h1>

      {/* Subtext */}
      <p className="text-body-lg text-muted max-w-2xl mb-10 leading-relaxed">
        Based in Jakarta, Indonesia. Building AI systems by day, exploring the
        world beyond the screen in between.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/work"
          className="inline-flex items-center px-6 py-3 bg-foreground text-background text-body-sm font-medium rounded-full hover:opacity-85 transition-opacity"
        >
          See my work
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
