"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  SpotlightCarousel                                                          */
/*  5 portrait reels · largest in the centre · progressive size falloff ·      */
/*  upward arc · subtle 3D depth · looping · autoplay · swipe · keyboard.      */
/*                                                                             */
/*  Requires: react, framer-motion                                             */
/*                                                                             */
/*  items = [{                                                                 */
/*    id, brand, logo, media, mediaType: "image" | "video",                    */
/*    poster?, title?                                                          */
/*  }]                                                                         */
/*  Use 5+ items for the best result. Missing media / logo fall back to a      */
/*  tasteful placeholder, so the layout can be previewed with no assets.       */
/* -------------------------------------------------------------------------- */

const SLOTS = [-2, -1, 0, 1, 2]; // five visible positions around the active card

// Per-distance pose (index = |distance| from active card). Index 3 is the
// invisible "staging" position cards enter from / exit to.
const POSE = {
  scale: [1, 0.86, 0.73, 0.62],
  rotate: [0, 4, 8, 11], // rotateZ, degrees
  rotateY: [0, 9, 16, 22], // faces the centre, degrees
  y: [0, 12, 28, 46], // px – outer cards sit lower => arc rises to centre
  z: [0, -40, -90, -150], // px – outer cards recede
  dim: [0, 0.1, 0.22, 0.3], // overlay darkness
};

const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(160deg,#2b3a67 0%,#1b1f3a 60%,#0d0f1c 100%)",
  "linear-gradient(160deg,#7a3b4d 0%,#3b1f2e 60%,#150c12 100%)",
  "linear-gradient(160deg,#1f5a55 0%,#123531 60%,#08161a 100%)",
  "linear-gradient(160deg,#8a6a2f 0%,#4a3616 60%,#1a1208 100%)",
  "linear-gradient(160deg,#4b3a7a 0%,#281f47 60%,#0e0b1c 100%)",
];

export const DEFAULT_ITEMS = [1, 2, 3, 4, 5].map((n) => ({
  id: n,
  brand: `Brand ${n}`,
  logo: `/logos/brand${n}.png`,
  media: `/reels/reel${n}.mp4`,
  mediaType: "video",
}));

const mod = (n, m) => ((n % m) + m) % m;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/* ----------------------------- Media + logo ------------------------------- */

function Media({ item, index }) {
  const [failed, setFailed] = useState(false);
  const fallbackBg = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];

  if (!item.media || failed) {
    return (
      <div className="sr-fallback" style={{ background: fallbackBg }}>
        <span>{item.title || item.brand}</span>
      </div>
    );
  }

  if (item.mediaType === "video") {
    return (
      <video
        className="sr-media"
        src={item.media}
        poster={item.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        controls={true}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <img
      className="sr-media"
      src={item.media}
      alt={item.title || `${item.brand} reel`}
      draggable={false}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function Logo({ item, height }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="brand-logo" style={{ height }}>
      {item.logo && !failed ? (
        <img
          src={item.logo}
          alt={`${item.brand} logo`}
          draggable={false}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="brand-logo-text">{item.brand}</span>
      )}
    </div>
  );
}

/* --------------------------------- Slot ----------------------------------- */

function Slot({ item, index, total, d, dir, cw, logoH, poseFor, transition, onSelect }) {
  const a = Math.abs(d);
  const isCenter = d === 0;

  // Exit variant reads the *fresh* direction via AnimatePresence `custom`,
  // and this slot's last known distance via closure.
  const variants = {
    exit: (freshDir) => ({ ...poseFor(d - freshDir), opacity: 0 }),
  };

  return (
    <motion.div
      className={`sr-slot${isCenter ? " is-center" : ""}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${item.brand}`}
      aria-current={isCenter ? "true" : undefined}
      style={{
        width: cw,
        marginLeft: -cw / 2,
        zIndex: Math.max(0, 50 - a * 20),
        originX: 0.5,
        originY: 1,
        pointerEvents: a > 2 ? "none" : "auto",
        cursor: isCenter ? "default" : "pointer",
      }}
      initial={{ ...poseFor(d + dir), opacity: 0 }}
      animate={poseFor(d)}
      exit="exit"
      variants={variants}
      transition={transition}
      onClick={() => !isCenter && onSelect(d)}
    >
      <motion.div
        className="sr-inner"
        whileHover={isCenter ? { scale: 1.03, y: -6 } : { scale: 1.02 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <Logo item={item} height={logoH} />
        <div className="sr-card" style={{ height: (cw * 16) / 9 }}>
          <Media item={item} index={index} />
          <div className="sr-dim" style={{ opacity: POSE.dim[Math.min(a, 3)] }} />
          <div className="sr-spot" style={{ opacity: isCenter ? 1 : 0 }} />
          <div className="sr-rim" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------- Carousel -------------------------------- */

export default function SpotlightCarousel({
  items = DEFAULT_ITEMS,
  autoplay = false,
  interval = 4500,
  eyebrow = "Master AI Reels",
  title = "AI Videos Works",
  subtitle = "A showcase of my most recent and notable projects, highlighting my expertise and creativity.",
  className = "",
}) {
  const n = items.length;
  const reduced = useReducedMotion();

  const stageRef = useRef(null);
  const [W, setW] = useState(1200);

  // `virtual` is an unbounded counter so entering/exiting cards keep stable keys
  const [virtual, setVirtual] = useState(0);
  const [dir, setDir] = useState(1);

  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [held, setHeld] = useState(false);
  const [hidden, setHidden] = useState(false);
  const holdTimer = useRef(null);

  /* ---- measure the stage ---- */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setW(entry.contentRect.width));
    ro.observe(el);
    setW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  /* ---- pause when the tab is hidden ---- */
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => () => clearTimeout(holdTimer.current), []);

  /* ---- navigation ---- */
  const go = useCallback((step) => {
    if (!step) return;
    setDir(step > 0 ? 1 : -1);
    setVirtual((v) => v + step);
  }, []);

  const holdFor = useCallback((ms) => {
    setHeld(true);
    clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => setHeld(false), ms);
  }, []);

  const manual = useCallback(
    (step) => {
      go(step);
      holdFor(6000); // manual interaction resets/pauses autoplay
    },
    [go, holdFor]
  );

  const jumpTo = useCallback(
    (target) => {
      const current = mod(virtual, n);
      let diff = target - current;
      if (diff > n / 2) diff -= n;
      if (diff < -n / 2) diff += n;
      manual(diff);
    },
    [virtual, n, manual]
  );

  /* ---- autoplay (timer restarts whenever the active slide changes) ---- */
  const paused = hovering || focused || held || hidden;
  useEffect(() => {
    if (!autoplay || reduced || paused || n < 2) return;
    const id = setTimeout(() => go(1), interval);
    return () => clearTimeout(id);
  }, [autoplay, reduced, paused, n, interval, virtual, go]);

  /* ---- responsive geometry ---- */
  const mobile = W < 720;
  const cw = mobile
    ? clamp(W * 0.78, 220, 360)
    : clamp(Math.min(W * 0.235, 300), 170, 300);
  const logoH = 100;
  const logoGap = 14;
  const basePad = 40;
  const stageH = Math.round(logoH + logoGap + (cw * 16) / 9 + basePad + 34);

  const xs = useMemo(() => {
    const s = POSE.scale;
    if (mobile) {
      const peek = W * 0.085;
      const x1 = W / 2 + (cw * s[1]) / 2 - peek;
      const x2 = x1 + cw * 0.18;
      const x3 = x2 + cw * 0.2;
      return [0, x1, x2, x3];
    }
    const x1 = cw * (0.5 + s[1] / 2) - cw * 0.02; // slight overlap
    const x2 = x1 + cw * (s[1] / 2 + s[2] / 2) - cw * 0.03;
    const x3 = x2 + cw * (s[2] / 2 + s[3] / 2) * 0.9;
    return [0, x1, x2, x3];
  }, [cw, W, mobile]);

  const poseFor = useCallback(
    (d) => {
      const a = Math.min(Math.abs(d), 3);
      const sgn = Math.sign(d);
      const soft = mobile ? 0.55 : 1; // calmer tilt on phones
      const flat = reduced ? 0 : 1; // reduced motion: no tilt / depth
      return {
        x: sgn * xs[a],
        y: POSE.y[a] * soft * (reduced ? 0.3 : 1),
        rotate: sgn * POSE.rotate[a] * soft * flat,
        rotateY: sgn * POSE.rotateY[a] * soft * flat,
        z: POSE.z[a] * flat,
        scale: POSE.scale[a],
        opacity: a >= 3 ? 0 : 1,
      };
    },
    [xs, mobile, reduced]
  );

  const transition = reduced
    ? { duration: 0.2, ease: "easeOut" }
    : {
        type: "spring",
        stiffness: 210,
        damping: 26,
        mass: 0.9,
        opacity: { duration: 0.4, ease: "easeOut" },
      };

  /* ---- input handlers ---- */
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      manual(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      manual(-1);
    }
  };

  const onPanEnd = (_, info) => {
    const { offset, velocity } = info;
    if (Math.abs(offset.x) < Math.abs(offset.y)) return; // vertical scroll
    if (offset.x < -50 || velocity.x < -450) manual(1);
    else if (offset.x > 50 || velocity.x > 450) manual(-1);
  };

  const active = mod(virtual, n);

  return (
    <section className={`sr-section ${className}`} aria-label={title || "Spotlight carousel"}>
      <style>{CSS}</style>

      {(eyebrow || title || subtitle) && (
        <header className="sr-head">
          {eyebrow && (
            <p className="sr-eyebrow">
              <i aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          {title && <h2 className="sr-title">{title}</h2>}
          {subtitle && <p className="sr-sub">{subtitle}</p>}
        </header>
      )}

      <div
        className="sr-wrap"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
        }}
        onPointerDown={(e) => e.pointerType === "touch" && holdFor(6000)}
      >
        <div className="sr-glow" aria-hidden="true" />

        <motion.div
          ref={stageRef}
          className={`sr-stage${mobile ? " is-mobile" : ""}`}
          style={{ height: stageH }}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={title || "Spotlight carousel"}
          onKeyDown={onKeyDown}
          onPan={undefined}
          onPanEnd={onPanEnd}
        >
          <div className="sr-persp" style={{ bottom: basePad }}>
            <AnimatePresence initial={false} custom={dir}>
              {SLOTS.map((offset) => {
                const v = virtual + offset;
                const idx = mod(v, n);
                return (
                  <Slot
                    key={v}
                    item={items[idx]}
                    index={idx}
                    total={n}
                    d={offset}
                    dir={dir}
                    cw={cw}
                    logoH={logoH}
                    poseFor={poseFor}
                    transition={transition}
                    onSelect={manual}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Desktop: arrows sit on the outer edges, as in the sketch */}
        {!mobile && n > 1 && (
          <>
            <NavButton side="left" label="Previous reel" onClick={() => manual(-1)} />
            <NavButton side="right" label="Next reel" onClick={() => manual(1)} />
          </>
        )}
      </div>

      <div className="sr-controls">
        {mobile && n > 1 && (
          <NavButton inline side="left" label="Previous reel" onClick={() => manual(-1)} />
        )}

        <div className="sr-dots" role="tablist" aria-label="Choose reel">
          {items.map((it, i) => (
            <button
              key={it.id ?? i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show ${it.brand}`}
              className={`sr-dot${i === active ? " on" : ""}`}
              onClick={() => jumpTo(i)}
            />
          ))}
        </div>

        {mobile && n > 1 && (
          <NavButton inline side="right" label="Next reel" onClick={() => manual(1)} />
        )}
      </div>

      <p className="sr-sr-only" aria-live="polite">
        {`Showing ${items[active]?.brand}, ${active + 1} of ${n}`}
      </p>
    </section>
  );
}

/* ------------------------------- Nav button ------------------------------- */

function NavButton({ side, label, onClick, inline = false }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`sr-nav ${inline ? "inline" : `edge ${side}`}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={side === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* --------------------------------- Styles --------------------------------- */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Manrope:wght@400;500;600&display=swap');

.sr-section{
  --sr-ink:#15171d; --sr-mute:#6b6f7a; --sr-bg:#f6f7f9;
  position:relative; width:100%; overflow-x:clip;
  padding:clamp(48px,8vw,104px) 0 clamp(40px,6vw,80px);
  background:var(--sr-bg); color:var(--sr-ink);
  font-family:var(--font-body);
}
.sr-head{ text-align:center; padding:0 24px; margin:0 auto clamp(20px,4vw,48px); max-width:720px; }
.sr-eyebrow{
  display:inline-flex; align-items:center; gap:8px; margin:0 0 14px;
  font-size:14px; font-weight:500; color:var(--sr-mute); letter-spacing:.01em;
}
.sr-eyebrow i{ width:7px; height:7px; border-radius:50%; background:var(--sr-ink); display:block; }
.sr-title{
  margin:0; font-family:var(--font-display);
  font-weight:400; font-size:clamp(36px,5.6vw,68px); line-height:1.02; letter-spacing:-.015em;
}
.sr-sub{ margin:16px auto 0; max-width:52ch; font-size:16px; line-height:1.55; color:var(--sr-mute); }

.sr-wrap{ position:relative; width:min(100%,1440px); margin:0 auto; }
.sr-glow{
  position:absolute; left:50%; top:52%; width:min(78%,900px); height:88%;
  transform:translate(-50%,-50%); pointer-events:none;
  background:radial-gradient(ellipse at center, rgba(112,124,160,.20) 0%, rgba(112,124,160,0) 62%);
}

.sr-stage{
  position:relative; width:100%; outline:none; touch-action:pan-y;
  clip-path:inset(-140px 0 -140px 0); /* clip sideways only, never top/bottom */
}
.sr-stage.is-mobile{ overflow:hidden; clip-path:none; }
.sr-stage:focus-visible{ outline:2px solid var(--sr-ink); outline-offset:6px; border-radius:24px; }
.sr-persp{
  position:absolute; left:50%; top:0; width:0;
  perspective:1200px; perspective-origin:50% 60%;
}

.sr-slot{ position:absolute; bottom:0; left:0; will-change:transform; }
.sr-inner{ display:flex; flex-direction:column; align-items:center; transform-origin:50% 100%; }

.brand-logo{
  display:flex; align-items:center; justify-content:center;
  margin-bottom:14px; padding:10px 24px; max-width:90%;
  background: #6D5EF8; border:1px solid rgba(20,22,29,.07); border-radius:999px;
  box-shadow:0 6px 18px -8px rgba(20,22,29,.18);
  box-sizing:border-box;
}
.brand-logo img{ height:94px; width:auto; max-width:100%; object-fit:contain; display:block; user-select:none; }
.brand-logo-text{ font-size:16px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; } 

.sr-card{
  position:relative; width:100%; overflow:hidden; background:#111;
  border-radius:clamp(26px,3vw,36px);
  border:1px solid rgba(255,255,255,.10);
  box-shadow:0 22px 44px -22px rgba(20,22,29,.42), 0 8px 18px -10px rgba(20,22,29,.25);
  transition:box-shadow .5s ease, filter .4s ease;
  isolation:isolate;
}
.sr-slot:not(.is-center) .sr-card{ filter:saturate(.92); }
.sr-slot:not(.is-center):hover .sr-card{ filter:saturate(1) brightness(1.04); }
.sr-slot.is-center .sr-card{
  box-shadow:0 46px 90px -26px rgba(20,22,29,.55), 0 20px 40px -18px rgba(20,22,29,.38);
}
.sr-slot.is-center:hover .sr-card{
  box-shadow:0 60px 110px -28px rgba(20,22,29,.62), 0 26px 48px -18px rgba(20,22,29,.42);
}

.sr-media{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; user-select:none; }
.sr-fallback{
  position:absolute; inset:0; display:flex; align-items:flex-end; padding:22px;
  color:rgba(255,255,255,.86); font-family:var(--font-display); font-size:clamp(20px,2.2vw,28px); line-height:1.1;
}
.sr-dim{ position:absolute; inset:0; background:#0d0f14; pointer-events:none; transition:opacity .6s ease; }

/* Spotlight: a soft top-light plus a faint floor bounce. Luxurious, not neon. */
.sr-spot{
  position:absolute; inset:0; pointer-events:none; transition:opacity .6s ease; mix-blend-mode:soft-light;
  background:
    radial-gradient(ellipse 85% 55% at 50% 12%, rgba(255,255,255,.55), rgba(255,255,255,0) 70%),
    radial-gradient(ellipse 70% 35% at 50% 100%, rgba(255,255,255,.18), rgba(255,255,255,0) 75%);
}
.sr-slot.is-center:hover .sr-spot{ filter:brightness(1.25); }
.sr-rim{ position:absolute; inset:0; border-radius:inherit; pointer-events:none; box-shadow:inset 0 0 0 1px rgba(255,255,255,.08), inset 0 1px 0 rgba(255,255,255,.18); }

.sr-controls{ display:flex; align-items:center; justify-content:center; gap:18px; margin-top:8px; }
.sr-dots{ display:flex; align-items:center; gap:8px; }
.sr-dot{
  width:7px; height:7px; padding:0; border:0; border-radius:999px; cursor:pointer;
  background:rgba(21,23,29,.22); transition:width .35s ease, background .35s ease;
}
.sr-dot:hover{ background:rgba(21,23,29,.4); }
.sr-dot.on{ width:24px; background:var(--sr-ink); }
.sr-dot:focus-visible,.sr-nav:focus-visible{ outline:2px solid var(--sr-ink); outline-offset:3px; }

.sr-nav{
  display:grid; place-items:center; width:42px; height:42px; padding:0; cursor:pointer;
  border:1px solid rgba(21,23,29,.10); border-radius:50%; background:#fff; color:var(--sr-ink);
  box-shadow:0 8px 20px -10px rgba(20,22,29,.3);
  transition:transform .25s ease, box-shadow .25s ease;
}
.sr-nav:hover{ transform:scale(1.06); box-shadow:0 12px 26px -10px rgba(20,22,29,.38); }
.sr-nav:active{ transform:scale(.96); }
.sr-nav.edge{ position:absolute; top:50%; margin-top:-21px; z-index:80; }
.sr-nav.edge.left{ left:clamp(8px,2vw,32px); }
.sr-nav.edge.right{ right:clamp(8px,2vw,32px); }

.sr-sr-only{
  position:absolute; width:1px; height:1px; margin:-1px; padding:0; overflow:hidden;
  clip:rect(0 0 0 0); white-space:nowrap; border:0;
}

@media (prefers-reduced-motion: reduce){
  .sr-card,.sr-spot,.sr-dim,.sr-dot,.sr-nav{ transition-duration:.01ms !important; }
}
`;
