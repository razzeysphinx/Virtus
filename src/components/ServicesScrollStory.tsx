"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

export function ServicesScrollStory() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const stageRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    let observer: IntersectionObserver | null = null;

    const stopObserving = () => {
      observer?.disconnect();
      observer = null;
    };

    const observeStages = () => {
      stopObserving();
      if (!desktopQuery.matches || typeof IntersectionObserver === "undefined") return;

      observer = new IntersectionObserver(
        (entries) => {
          const activeEntry = entries.find((entry) => entry.isIntersecting);
          if (!activeEntry) return;

          const nextIndex = Number(
            (activeEntry.target as HTMLElement).dataset.serviceStage,
          );

          setActiveServiceIndex((currentIndex) =>
            currentIndex === nextIndex ? currentIndex : nextIndex,
          );
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );

      stageRefs.current.forEach((stage) => {
        if (stage) observer?.observe(stage);
      });
    };

    observeStages();
    desktopQuery.addEventListener("change", observeStages);

    return () => {
      desktopQuery.removeEventListener("change", observeStages);
      stopObserving();
    };
  }, []);

  return (
    <div className="services-story">
      <div className="services-story__sticky">
        <p className="readout readout-caps text-tide">Capabilities</p>
        <h2 className="mt-5 text-h2 text-seaglass">{site.services.title}</h2>
        <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-seaglass/85">
          {site.services.intro}
        </p>
        <div className="services-story__progress mt-10" aria-label="Service stages">
          <span className="readout text-tide">
            {String(activeServiceIndex + 1).padStart(2, "0")} / {String(site.services.pillars.length).padStart(2, "0")}
          </span>
          <ol className="services-story__rail" aria-hidden="true">
            {site.services.pillars.map((pillar, index) => (
              <li key={pillar.id} className={index === activeServiceIndex ? "is-active" : undefined} />
            ))}
          </ol>
        </div>
      </div>

      <div className="services-story__stages">
        {site.services.pillars.map((pillar, index) => (
          <Link
            key={pillar.id}
            ref={(element) => {
              stageRefs.current[index] = element;
            }}
            href={`/services/${pillar.slug}`}
            data-service-stage={index}
            aria-label={`Explore ${pillar.name}`}
            className={`services-story__stage group${index === activeServiceIndex ? " is-active" : ""}`}
          >
            <span className="readout text-tide">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-5 font-sans text-2xl font-semibold text-seaglass sm:text-3xl">{pillar.name}</h3>
            <p className="mt-5 max-w-[46ch] text-[1rem] leading-relaxed text-seaglass/92">{pillar.outcome}</p>
            <div className="mt-6 flex max-w-[48rem] flex-wrap gap-x-4 gap-y-2">
              {pillar.capabilities.map((capability) => (
                <span key={capability} className="text-[0.8rem] text-tide">{capability}</span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="readout readout-caps text-tide/70">Related</span>
              <span className="text-sm font-medium text-seaglass">{pillar.relatedWork}</span>
              <span aria-hidden className="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-tide">
                Explore <span className="transition-transform duration-300 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
