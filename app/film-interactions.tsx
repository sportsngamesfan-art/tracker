"use client";
import { useEffect, useRef, useState } from "react";
import { filmChapters, goalsPerGame, milestones, seasons } from "./content";

export function FilmMotion() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      innerWidth < 900
    )
      return;
    let disposed = false;
    let cleanup = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([g, s]) => {
        if (disposed) return;
        const gsap = g.default,
          ScrollTrigger = s.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add(
          "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
          () => {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: ".film-hero",
                  start: "top top",
                  end: "+=45%",
                  pin: true,
                  scrub: 0.7,
                },
              })
              .to(".hero-photo", { scale: 1.1, ease: "none" }, 0)
              .to(".hero-title", { y: -50, opacity: 0.35, ease: "none" }, 0);
            gsap.utils
              .toArray<HTMLElement>(".parallax-photo")
              .forEach((el) =>
                gsap.fromTo(
                  el,
                  { yPercent: -4 },
                  {
                    yPercent: 4,
                    ease: "none",
                    scrollTrigger: {
                      trigger: el.parentElement,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: true,
                    },
                  },
                ),
              );
            gsap.fromTo(
              ".bayern-wipe",
              { clipPath: "inset(0 100% 0 0)" },
              {
                clipPath: "inset(0 0% 0 0)",
                ease: "none",
                scrollTrigger: {
                  trigger: ".leap",
                  start: "top 85%",
                  end: "top 20%",
                  scrub: 0.5,
                },
              },
            );
            gsap.fromTo(
              ".spurs-photo",
              { clipPath: "inset(0 15% 0 15%)" },
              {
                clipPath: "inset(0 0% 0 0%)",
                ease: "none",
                scrollTrigger: {
                  trigger: ".spurs-photo",
                  start: "top 90%",
                  end: "top 30%",
                  scrub: true,
                },
              },
            );
            gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
              const target = Number(el.dataset.count),
                counter = { value: 0 };
              gsap.to(counter, {
                value: target,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
                onUpdate: () => {
                  el.textContent = String(Math.round(counter.value));
                },
              });
            });
          },
        );
        const refresh = () => ScrollTrigger.refresh();
        document.fonts.ready.then(() => {
          if (!disposed) refresh();
        });
        cleanup = () => media.revert();
      })
      .catch(() => {
        /* Static storytelling remains fully usable. */
      });
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);
  return null;
}

export function FilmNav() {
  const [open, setOpen] = useState(false);
  const [chapter, setChapter] = useState("PROLOGUE");
  const [progress, setProgress] = useState(0);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setChapter(
              filmChapters
                .find((c) => c.id === e.target.id)
                ?.title.toUpperCase() ?? "PROLOGUE",
            );
        }),
      { rootMargin: "-15% 0px -60% 0px" },
    );
    filmChapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        setProgress(
          window.scrollY /
            Math.max(1, document.documentElement.scrollHeight - innerHeight),
        ),
      );
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  return (
    <header className="film-nav">
      <a
        href="#prologue"
        className="brand"
        aria-label="Harry Kane documentary home"
      >
        HK<span>9</span>
      </a>
      <span className="current-chapter">{chapter}</span>
      <div className="nav-actions">
        <a href="#fan-zone">PLAY</a>
        <button
          ref={trigger}
          aria-expanded={open}
          aria-controls="chapter-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "CLOSE −" : "CHAPTERS +"}
        </button>
      </div>
      <div
        className="film-progress"
        style={{ transform: `scaleX(${Math.min(1, progress)})` }}
      />
      {open && (
        <nav id="chapter-menu" aria-label="Documentary chapters">
          {filmChapters.map((c, i) => (
            <a key={c.id} href={`#${c.id}`} onClick={() => setOpen(false)}>
              <span>0{i + 1}</span>
              <strong>{c.title}</strong>
              <small>{c.year}</small>
            </a>
          ))}
          <a href="#fan-zone" onClick={() => setOpen(false)}>
            Statistics, quiz & fan vote ↗
          </a>
        </nav>
      )}
    </header>
  );
}

export function MilestoneExplorer() {
  const [index, setIndex] = useState(3);
  const m = milestones[index];
  return (
    <div className="milestone-explorer">
      <div className="milestone-years" aria-label="Tottenham milestones">
        {milestones.map((item, i) => (
          <button
            key={item.year}
            aria-pressed={index === i}
            onClick={() => setIndex(i)}
          >
            {item.year}
          </button>
        ))}
      </div>
      <article key={index} className="milestone-detail" aria-live="polite">
        <span className="large-year">{m.year}</span>
        <div>
          <h3>{m.title}</h3>
          <p>{m.body}</p>
          <a
            className="source-link"
            href={m.source}
            target="_blank"
            rel="noreferrer"
          >
            Read the source ↗
          </a>
        </div>
      </article>
    </div>
  );
}

export function StatExplorer() {
  const [index, setIndex] = useState(0);
  const s = seasons[index];
  return (
    <div className="stat-explorer">
      <label htmlFor="stat-era">Explore the numbers</label>
      <select
        id="stat-era"
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
      >
        {seasons.map((era, i) => (
          <option key={era.id} value={i}>
            {era.label}
          </option>
        ))}
      </select>
      <div className="stat-values" aria-live="polite">
        <div>
          <strong key={`g${index}`}>{s.goals}</strong>
          <span>GOALS</span>
        </div>
        <div>
          <strong>{s.games}</strong>
          <span>APPEARANCES</span>
        </div>
        <div>
          <strong>{goalsPerGame(s.goals, s.games)}</strong>
          <span>GOALS / GAME</span>
        </div>
      </div>
      <p className="stat-scope">
        {s.competition}. Historical snapshots, not live career totals.
      </p>
      <a href={s.source} className="source-link">
        Verify these figures ↗
      </a>
      <details className="era-comparison">
        <summary>Compare club eras +</summary>
        <table>
          <caption>
            Different competitions and time spans; not a like-for-like ranking.
          </caption>
          <thead>
            <tr>
              <th scope="col">Scope</th>
              <th scope="col">Goals</th>
              <th scope="col">Games</th>
              <th scope="col">G/game</th>
            </tr>
          </thead>
          <tbody>
            {seasons.map((e) => (
              <tr key={e.id}>
                <th scope="row">{e.label}</th>
                <td>{e.goals}</td>
                <td>{e.games}</td>
                <td>{goalsPerGame(e.goals, e.games)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}

const pollChoices = [
  "His finishing",
  "His creativity",
  "His resilience",
  "His leadership",
];
export function FanPoll() {
  const [vote, setVote] = useState<number | null>(null);
  const [stored, setStored] = useState(true);
  useEffect(() => {
    try {
      const n = localStorage.getItem("hk-poll-v2");
      if (n !== null && /^\d$/.test(n) && Number(n) < 4) setVote(Number(n));
    } catch {
      setStored(false);
    }
  }, []);
  function cast(i: number) {
    setVote(i);
    try {
      localStorage.setItem("hk-poll-v2", String(i));
    } catch {
      setStored(false);
    }
  }
  return (
    <section className="fan-poll" aria-labelledby="poll-heading">
      <p className="kicker">YOUR VERDICT / UNOFFICIAL</p>
      <h3 id="poll-heading">What defines Kane?</h3>
      <p>No global leaderboard. Just your take on the story.</p>
      <div className="poll-options">
        {pollChoices.map((c, i) => (
          <button key={c} aria-pressed={vote === i} onClick={() => cast(i)}>
            {c}
            <span>{vote === i ? "YOUR PICK ✓" : "↗"}</span>
          </button>
        ))}
      </div>
      <p className="poll-note" aria-live="polite">
        {vote === null
          ? "Choose one quality."
          : `Your vote: ${pollChoices[vote]}. Change it at any time.`}{" "}
        {stored
          ? "Saved on this browser only; not a public poll result."
          : "Browser storage unavailable; your choice lasts for this visit."}
      </p>
    </section>
  );
}

export function NumberNine() {
  const [found, setFound] = useState(false);
  return (
    <div className="number-nine">
      <button
        aria-expanded={found}
        onClick={() => setFound((v) => !v)}
        aria-label="Discover the number nine story"
      >
        9
      </button>
      {found && (
        <p role="status">
          A number on a shirt. A creator between the lines. In 2020/21, Kane won
          both the Premier League scoring and playmaking awards.{" "}
          <a href="https://www.tottenhamhotspur.com/the-club/history/legends/harry-kane">
            The evidence ↗
          </a>
        </p>
      )}
    </div>
  );
}
