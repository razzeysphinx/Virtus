import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./primitives";
import { ServicesScrollStory } from "./ServicesScrollStory";

export function Services() {
  return (
    <section
      id="services"
      className="services-portal-section scroll-mt-24 bg-transparent pt-16 pb-24 sm:pt-20 sm:pb-32"
    >
      <Container>
        <ServicesScrollStory />

        <div className="mt-9 flex flex-col gap-5 border-l border-tide pl-5 sm:flex-row sm:items-center sm:justify-between lg:mt-0">
          <p className="max-w-[55ch] text-base leading-relaxed text-seaglass">
            {site.services.closing}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-seaglass transition-colors hover:text-tide"
            >
              View all services
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>

            <a
              href={site.nav.action.href}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-tide transition-colors hover:text-seaglass"
            >
              {site.nav.action.label}
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
