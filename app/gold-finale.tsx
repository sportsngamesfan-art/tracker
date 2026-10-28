"use client";
import { useEffect, useRef, useState } from "react";

export function GoldFinale() {
  const root = useRef<HTMLElement>(null);
  const [burst, setBurst] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBurst(1);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={root} className="gold-finale" aria-label="The final frame">
      <div className="gold-aura" aria-hidden="true" />
      <div className="confetti" key={burst} aria-hidden="true">
        {burst > 0 &&
          Array.from({ length: 64 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 9) * 0.08}s`,
                animationDuration: `${2.5 + (i % 7) * 0.3}s`,
                background: ["#e8bd61", "#fff1c4", "#98702a"][i % 3],
                transform: `rotate(${i * 29}deg)`,
              }}
            />
          ))}
      </div>
      <p className="eyebrow">THE FINAL FRAME / AN UNOFFICIAL FAN TRIBUTE</p>
      <h2>
        THE PURSUIT
        <br />
        <em>OF GOLD.</em>
      </h2>
      <p className="finale-copy">
        Every setback. Every return. Every goal.
        <br />A career built one moment at a time.
      </p>
      <button className="celebrate" onClick={() => setBurst((n) => n + 1)}>
        REPLAY THE GOLDEN MOMENT <span>↗</span>
      </button>
      <p className="finale-end">THE STORY IS STILL BEING WRITTEN.</p>
      <small>
        Celebration is an artistic effect, not an award announcement.{" "}
        <a href="https://www.uefa.com/ballondor/">
          Official Ballon d’Or information ↗
        </a>
      </small>
    </section>
  );
}

export function PhotoSequence() {
  return (
    <section className="photo-sequence">
      <div>
        <p className="eyebrow">THE MAN BEHIND THE NUMBER</p>
        <h2>
          FOCUS.
          <br />
          BELIEF.
          <br />
          <em>REPEAT.</em>
        </h2>
      </div>
      <figure>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/02/Harry_Kane_2023.jpg"
          alt="Harry Kane at St George’s Park, October 2023"
          width="880"
          height="1416"
          loading="lazy"
        />
        <figcaption>01 / ST GEORGE’S PARK · 2023</figcaption>
      </figure>
      <figure>
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Harry_Kane_in_Russia_2.jpg"
          alt="Harry Kane during England World Cup training in 2018"
          width="628"
          height="893"
          loading="lazy"
        />
        <figcaption>02 / WORLD CUP TRAINING · 2018</figcaption>
      </figure>
    </section>
  );
}
