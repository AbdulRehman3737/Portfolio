"use client";

import { animate, motion, useMotionValue, type PanInfo } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo, Pause, Play, TrendUp } from "@phosphor-icons/react";
import { softBreak } from "@/lib/softBreak";
import "./ProjectCarousel.css";

export type CarouselProject = {
  slug: string;
  name: string;
  blurb: string;
  tags: string[];
  impact?: string;
  image?: string;
  fallback?: ReactNode;
  liveUrl?: string;
  repoUrl?: string;
  footNote?: string;
};

type ProjectCarouselProps = {
  items: CarouselProject[];
  autoplay?: boolean;
  autoplayDelay?: number;
  reduceMotion?: boolean;
  /** Rendered at the start of the header row, beside the carousel controls. */
  heading?: ReactNode;
};

const DRAG_BUFFER = 60;
const VELOCITY_THRESHOLD = 450;
const GAP = 24;
const SPRING = { type: "spring", stiffness: 260, damping: 32 } as const;

/**
 * Adapted from React Bits' Carousel. It keeps the core mechanics: a motion drag track
 * with spring snapping, offset and velocity thresholds, looping, autoplay that pauses on
 * hover, and dot indicators. The small icon cards are replaced with a full-width
 * showcase slide (big image plus copy). Additions: prev/next buttons, arrow-key
 * navigation, and slide widths measured with ResizeObserver so the track
 * stays responsive.
 */
export default function ProjectCarousel({ items, autoplay = true, autoplayDelay = 6000, reduceMotion = false, heading }: ProjectCarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  // `paused` is transient (hover, focus, drag). `stopped` is the user's explicit choice
  // from the pause button and lasts until they press play.
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const draggedRef = useRef(false);
  const x = useMotionValue(0);
  const count = items.length;
  // The next slide peeks in at the right edge, a visible cue that there is more
  // to see: a strip on desktop, a sliver on phones.
  const peek = count > 1 ? (width >= 768 ? Math.round(Math.min(96, width * 0.07)) : 24) : 0;
  const slideWidth = Math.max(0, width - peek);
  const step = slideWidth + GAP;

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  // Snap the track whenever the target slide or the measured width changes.
  useEffect(() => {
    if (!width) return;
    const target = -index * step;
    if (reduceMotion) {
      x.set(target);
      return;
    }
    const controls = animate(x, target, SPRING);
    return () => controls.stop();
  }, [index, step, width, reduceMotion, x]);

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  const canRotate = autoplay && !reduceMotion && count > 1;
  const rotating = canRotate && !stopped && !paused;

  useEffect(() => {
    if (!rotating) return;
    const id = window.setTimeout(() => go(index + 1), autoplayDelay);
    return () => window.clearTimeout(id);
  }, [rotating, autoplayDelay, index, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD) go(index + 1);
    else if (offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD) go(index - 1);
    else animate(x, -index * step, SPRING);
  };

  return (
    <div
      className="project-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(index + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(index - 1);
        }
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="project-carousel-header">
        {heading}
        <div className="project-carousel-arrows">
          {canRotate && (
            <button
              type="button"
              className="project-carousel-arrow"
              aria-label={stopped ? "Start slide rotation" : "Stop slide rotation"}
              onClick={() => setStopped((s) => !s)}
            >
              {stopped ? <Play size={16} weight="fill" /> : <Pause size={16} weight="fill" />}
            </button>
          )}
          <button type="button" className="project-carousel-arrow" aria-label="Previous project" onClick={() => go(index - 1)}>
            <ArrowLeft size={18} />
          </button>
          <button type="button" className="project-carousel-arrow" aria-label="Next project" onClick={() => go(index + 1)}>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div ref={viewportRef} className="project-carousel-viewport">
        <motion.div
          className="project-carousel-track"
          style={{ x, gap: GAP }}
          drag={count > 1 ? "x" : false}
          dragConstraints={{ left: -(count - 1) * step - DRAG_BUFFER, right: DRAG_BUFFER }}
          dragElastic={0.12}
          onDragStart={() => {
            draggedRef.current = true;
            setPaused(true);
          }}
          onClickCapture={(e) => {
            // A drag that ends over a link must not also open it.
            if (draggedRef.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          onPointerDown={() => {
            draggedRef.current = false;
          }}
          onDragEnd={onDragEnd}
        >
          {items.map((item, i) => (
            <Slide key={item.slug} item={item} width={slideWidth} active={i === index} position={i + 1} total={count} onSelect={() => go(i)} />
          ))}
        </motion.div>
      </div>

      <div className="project-carousel-controls">
        {/* Announce slide changes only when the user caused them; announcing every
            auto-advance would talk over whatever a screen-reader user is doing. */}
        <span className="sr-only" aria-live={rotating ? "off" : "polite"} aria-atomic="true">
          {`${items[index]?.name}, project ${index + 1} of ${count}`}
        </span>

        <div className="project-carousel-dots" role="group" aria-label="Choose project">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              aria-current={i === index ? "true" : undefined}
              aria-label={`Show ${item.name}`}
              className={`project-carousel-dot ${i === index ? "is-active" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide({
  item,
  width,
  active,
  position,
  total,
  onSelect,
}: {
  item: CarouselProject;
  width: number;
  active: boolean;
  position: number;
  total: number;
  onSelect: () => void;
}) {
  return (
    <article
      className={`project-slide ${active ? "is-active" : ""}`}
      style={{ width: width || "100%" }}
      role="group"
      aria-roledescription="slide"
      aria-label={`${position} of ${total}: ${item.name}`}
      aria-hidden={!active}
      // Clicking the peeking slide brings it forward; its contents stay inert until then.
      onClick={active ? undefined : onSelect}
    >
      <div className="project-slide-inner" inert={!active}>
        <Link href={`/projects/${item.slug}`} className="project-slide-media" draggable={false} tabIndex={-1} aria-hidden="true">
          {item.image ? (
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="project-slide-img"
              draggable={false}
              loading={position === 1 ? "eager" : "lazy"}
            />
          ) : (
            <div className="project-slide-fallback">{item.fallback}</div>
          )}
        </Link>

        <div className="project-slide-body">
          <h3 className="signal-display project-slide-title">{softBreak(item.name)}</h3>
          <p className="project-slide-blurb">{item.blurb}</p>

          {item.impact && (
            <p className="signal-mono project-slide-impact">
              <TrendUp size={14} weight="bold" aria-hidden="true" className="project-slide-impact-icon" />
              {item.impact}
            </p>
          )}

          {item.tags.length > 0 && (
            <ul className="project-slide-tags" aria-label="Tech stack">
              {item.tags.map((tag) => (
                <li key={tag} className="signal-chip">
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="project-slide-actions">
            <Link href={`/projects/${item.slug}`} className="project-slide-cta" draggable={false}>
              View project <ArrowRight size={16} weight="bold" />
            </Link>
            {item.liveUrl && (
              <a href={item.liveUrl} target="_blank" rel="noreferrer" className="project-slide-link" draggable={false}>
                Live site <ArrowUpRight size={14} />
              </a>
            )}
            {item.repoUrl && (
              <a href={item.repoUrl} target="_blank" rel="noreferrer" className="project-slide-link" draggable={false}>
                <GithubLogo size={14} /> Source
              </a>
            )}
            {item.footNote && <span className="signal-mono project-slide-footnote">{item.footNote}</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
