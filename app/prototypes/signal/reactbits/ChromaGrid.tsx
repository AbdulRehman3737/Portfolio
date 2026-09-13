"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import "./ChromaGrid.css";

export type ChromaItem = {
  image?: string;
  fallback?: ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
  tags?: string[];
  liveUrl?: string;
  repoUrl?: string;
  footNote?: string;
  /** Bright accent used for the border-on-hover, badge, and spotlight tint. */
  borderColor: string;
  /** Muted background fill — should already be toned down, not the raw accent. */
  gradient: string;
  /** Grid columns this card spans, for a featured/bigger card in the grid. */
  colSpan?: number;
};

type ChromaGridProps = {
  items: ChromaItem[];
  className?: string;
  radius?: number;
  columns?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
  disableSpotlight?: boolean;
};

/**
 * Adapted from reactbits' Chroma Grid. The cursor-follow color-reveal mechanic is
 * ported via GSAP, but re-scoped from a single grid-wide overlay to per-card
 * overlays: the original tracks one spotlight position against the whole grid's
 * bounding box, which — once real backdrop-filter grayscale was wired up — made
 * the *gaps* between cards (and any row-to-row gap) darken too, showing up as a
 * visible rectangular frame behind the actual cards. Each card now gets its own
 * overlay/boost/fade trio, clipped by that card's own `overflow: hidden`, driven
 * by the same shared damped cursor position translated into that card's local
 * coordinates — so the spotlight still reads as one continuous light source
 * sweeping across the grid (and can light up adjacent cards at once), it just
 * can't bleed into the empty space between them anymore.
 *
 * The per-card footer is extended beyond the original's name/handle/role/location
 * schema — this site's projects need a status badge, tech-stack tags, and real
 * Live/Source links, not a social handle — and the whole-card "click opens a URL"
 * behavior is dropped in favor of explicit link elements, which is more
 * accessible than an opaque clickable card with no visible affordance.
 * `disableSpotlight` (reduced-motion or touch, where hover doesn't apply) skips
 * the GSAP tracking and the grayscale masks entirely, showing full color always.
 */
export default function ChromaGrid({
  items,
  className = "",
  radius = 320,
  columns = 3,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
  disableSpotlight = false,
}: ChromaGridProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const boostRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef({ x: 0, y: 0 });
  const hasMounted = useRef(false);

  const applyCardVars = () => {
    const grid = rootRef.current;
    if (!grid) return;
    const gridRect = grid.getBoundingClientRect();
    const globalX = gridRect.left + pos.current.x;
    const globalY = gridRect.top + pos.current.y;
    cardRefs.current.forEach((card) => {
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${globalX - r.left}px`);
      card.style.setProperty("--y", `${globalY - r.top}px`);
    });
  };

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: applyCardVars,
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disableSpotlight || !rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    if (!hasMounted.current) {
      // First movement: snap instead of animating in from the grid's center.
      pos.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      applyCardVars();
      hasMounted.current = true;
    } else {
      moveTo(e.clientX - r.left, e.clientY - r.top);
    }
    const fades = fadeRefs.current.filter(Boolean);
    const boosts = boostRefs.current.filter(Boolean);
    if (fades.length) gsap.to(fades, { opacity: 0, duration: 0.25, overwrite: true });
    if (boosts.length) gsap.to(boosts, { opacity: 1, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    if (disableSpotlight) return;
    const fades = fadeRefs.current.filter(Boolean);
    const boosts = boostRefs.current.filter(Boolean);
    if (fades.length) gsap.to(fades, { opacity: 1, duration: fadeOut, overwrite: true });
    if (boosts.length) gsap.to(boosts, { opacity: 0, duration: fadeOut, overwrite: true });
  };

  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    if (disableSpotlight) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{ "--r": `${radius}px`, "--cols": columns } as React.CSSProperties}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {items.map((c, i) => (
        <article
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={`chroma-card ${c.colSpan && c.colSpan > 1 ? "chroma-card--wide" : ""}`}
          onMouseMove={handleCardMove}
          style={
            {
              "--card-border": c.borderColor,
              "--card-gradient": c.gradient,
              "--card-accent": c.borderColor,
              gridColumn: c.colSpan ? `span ${c.colSpan}` : undefined,
            } as React.CSSProperties
          }
        >
          <div className="chroma-img-wrapper">
            {c.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.image} alt={c.title} loading="lazy" />
            ) : (
              <div className="chroma-fallback">{c.fallback}</div>
            )}
          </div>
          <footer className="chroma-info">
            <div className="chroma-heading">
              <h3 className="name">{c.title}</h3>
              {c.badge && (
                <span className="chroma-badge" style={{ borderColor: `${c.borderColor}66`, color: c.borderColor, background: `${c.borderColor}1a` }}>
                  {c.badge}
                </span>
              )}
            </div>
            <p className="role">{c.subtitle}</p>
            {c.tags && c.tags.length > 0 && (
              <div className="chroma-tags">
                {c.tags.map((tag) => (
                  <span key={tag} className="chroma-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {(c.liveUrl || c.repoUrl || c.footNote) && (
              <div className="chroma-links">
                {c.liveUrl && (
                  <a href={c.liveUrl} target="_blank" rel="noopener noreferrer" className="chroma-link chroma-link--live">
                    Live
                  </a>
                )}
                {c.repoUrl && (
                  <a href={c.repoUrl} target="_blank" rel="noopener noreferrer" className="chroma-link">
                    Source
                  </a>
                )}
                {!c.liveUrl && !c.repoUrl && c.footNote && <span className="chroma-footnote">{c.footNote}</span>}
              </div>
            )}
          </footer>
          {!disableSpotlight && (
            <>
              <div className="chroma-overlay" />
              <div
                ref={(el) => {
                  boostRefs.current[i] = el;
                }}
                className="chroma-boost"
              />
              <div
                ref={(el) => {
                  fadeRefs.current[i] = el;
                }}
                className="chroma-fade"
              />
            </>
          )}
        </article>
      ))}
    </div>
  );
}
