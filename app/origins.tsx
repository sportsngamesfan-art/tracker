"use client";
import { useState } from "react";

const moments = [
  {
    date: "1993",
    title: "EAST LONDON. BIG DREAMS.",
    place: "Walthamstow → Chingford",
    text: "Born on 28 July 1993 in Walthamstow, Kane grew up in Chingford. In his own account, the park behind his house was his first football world: his dad, his brother, grass and two trees for goals.",
    source:
      "https://www.theplayerstribune.com/articles/harry-kane-tottenham-zero-to-100",
  },
  {
    date: "GRASSROOTS",
    title: "A BALL. A PARK. A START.",
    place: "Ridgeway Rovers",
    text: "His local club was Ridgeway Rovers. Kane remembers playing after school with his family and taking every chance to play. Football became a daily habit long before it became a career.",
    source: "https://harrykane.com/pages/my-story",
  },
  {
    date: "ARSENAL",
    title: "THE FIRST CLOSED DOOR.",
    place: "Arsenal youth academy",
    text: "Kane spent part of his childhood in Arsenal’s youth system before being released. He remembers his dad explaining the news on a walk to the park. His family’s response was encouragement: keep working and find another club.",
    source:
      "https://www.theplayerstribune.com/articles/harry-kane-tottenham-zero-to-100",
  },
  {
    date: "WATFORD",
    title: "ANOTHER WAY FORWARD.",
    place: "A trial. A new opportunity.",
    text: "After returning to local football, a Watford scout offered Kane a trial. Playing for Watford against Tottenham opened the door to Spurs. The route into an academy was a series of opportunities, setbacks and second chances.",
    source:
      "https://www.theplayerstribune.com/articles/harry-kane-tottenham-zero-to-100",
  },
  {
    date: "2004",
    title: "NORTH LONDON CALLING.",
    place: "Tottenham youth pathway",
    text: "Kane joined Tottenham’s youth setup in 2004. His later scholarship and Academy progression were separate milestones. The boy who had been released now had another place to develop—and years of work ahead.",
    source: "https://fcbayern.com/en/teams/first-team/harry-kane",
  },
];
export function Origins() {
  const [index, setIndex] = useState(0);
  const m = moments[index];
  return (
    <section className="origins" aria-label="Explore Harry Kane’s childhood">
      <div className="origins-heading">
        <p className="eyebrow">THE ORIGIN FILES / 1993—2004</p>
        <h2>
          EVERY LEGEND
          <br />
          STARTS SOMEWHERE.
        </h2>
        <p>Select a moment. Follow the boy before the goals.</p>
      </div>
      <div className="origin-selector" aria-label="Childhood moments">
        {moments.map((item, i) => (
          <button
            key={item.date}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
          >
            <span>0{i + 1}</span>
            {item.date}
          </button>
        ))}
      </div>
      <article className="origin-story" key={index}>
        <div className="origin-year">{m.date}</div>
        <div aria-live="polite">
          <small>{m.place}</small>
          <h3>{m.title}</h3>
          <p>{m.text}</p>
          <a href={m.source} target="_blank" rel="noreferrer">
            READ THE SOURCE ↗
          </a>
        </div>
      </article>
      <div className="origin-controls">
        <button onClick={() => setIndex((index + 4) % 5)}>← PREVIOUS</button>
        <span>{index + 1} / 5</span>
        <button onClick={() => setIndex((index + 1) % 5)}>NEXT MOMENT →</button>
      </div>
      <p className="research-note">
        Early recollections differ on exact ages. This timeline follows Kane’s
        first-person accounts and distinguishes his youth arrival from later
        Academy scholarship milestones.
      </p>
    </section>
  );
}

export function ClubStrip() {
  return (
    <div className="club-strip">
      <a href="#tottenham">
        <img
          src="https://resources.premierleague.com/premierleague/badges/t6.svg"
          width="52"
          height="60"
          alt="Tottenham Hotspur crest"
        />
        <span>
          TOTTENHAM<small>THE ROOTS</small>
        </span>
      </a>
      <span className="club-connector">→</span>
      <a href="#bayern">
        <img
          src="https://a.espncdn.com/i/teamlogos/soccer/500/132.png"
          width="60"
          height="60"
          alt="FC Bayern Munich crest"
        />
        <span>
          BAYERN MUNICH<small>THE NEXT CHAPTER</small>
        </span>
      </a>
    </div>
  );
}
