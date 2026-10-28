"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
const TrophyScene = dynamic(() => import("./trophy-scene"), {
  ssr: false,
  loading: () => (
    <div className="trophy-canvas scene-loading">Lighting the trophy room…</div>
  ),
});
const questions = [
  {
    q: "Which local club helped start Kane’s football journey?",
    options: ["Ridgeway Rovers", "Leyton Orient", "Millwall", "Watford"],
    correct: 0,
    explain: "Ridgeway Rovers was his grassroots club in Chingford.",
  },
  {
    q: "At which loan club did Kane describe doubts about making it at Tottenham?",
    options: ["Norwich City", "Leicester City", "Leyton Orient", "Millwall"],
    correct: 1,
    explain:
      "In his Players’ Tribune account, Kane recalls struggling for a place at Leicester.",
  },
  {
    q: "How many competitive goals did Kane score for Tottenham?",
    options: ["213", "267", "280", "300"],
    correct: 2,
    explain:
      "He scored 280 in all competitions. The 213 figure is his Tottenham Premier League total.",
  },
  {
    q: "How many Bundesliga goals did he score in his first Bayern season?",
    options: ["26", "30", "32", "36"],
    correct: 3,
    explain: "His 2023/24 league season ended with 36 goals in 32 appearances.",
  },
];
export function InteractiveZone() {
  const [start, setStart] = useState(false);
  return (
    <section id="trophy-room" className="interactive-zone">
      <div className="zone-heading">
        <p className="eyebrow">OFF THE TIMELINE / INTERACTIVE EXHIBIT</p>
        <h2>
          Get closer
          <br />
          to the <em>gold.</em>
        </h2>
        <p>
          Choose a trophy. Turn it in the light.
          <br />
          Then see how well you know the journey.
        </p>
      </div>
      {start ? (
        <TrophyScene />
      ) : (
        <button className="enter-scene" onClick={() => setStart(true)}>
          <span className="scene-ring" aria-hidden="true" />
          <strong>ENTER THE TROPHY ROOM</strong>
          <small>Launch interactive 3D ↗</small>
        </button>
      )}
    </section>
  );
}
export function CareerQuiz() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[index];
  return (
    <section id="career-quiz" className="career-quiz">
      <div>
        <p className="eyebrow">THE KANE CHALLENGE / FOUR QUESTIONS</p>
        <h2>
          Were you
          <br />
          <em>paying attention?</em>
        </h2>
        <p>No timer. No pressure. Just the story.</p>
      </div>
      <div className="quiz-panel">
        {done ? (
          <div aria-live="polite">
            <span className="quiz-count">CHALLENGE COMPLETE</span>
            <h3>
              {score} / {questions.length}
            </h3>
            <p>
              {score === 4
                ? "You know the journey."
                : "There’s always another detail to discover."}
            </p>
            <button
              className="film-button"
              onClick={() => {
                setIndex(0);
                setAnswer(null);
                setScore(0);
                setDone(false);
              }}
            >
              PLAY AGAIN ↗
            </button>
          </div>
        ) : (
          <>
            <span className="quiz-count">
              QUESTION {index + 1} OF {questions.length} · SCORE {score}
            </span>
            <h3>{q.q}</h3>
            <div className="quiz-options">
              {q.options.map((option, i) => (
                <button
                  key={option}
                  aria-label={`${"ABCD"[i]} ${option}`}
                  disabled={answer !== null}
                  className={
                    answer !== null && i === q.correct
                      ? "correct"
                      : answer === i
                        ? "incorrect"
                        : ""
                  }
                  onClick={() => {
                    setAnswer(i);
                    if (i === q.correct) setScore((s) => s + 1);
                  }}
                >
                  <span>{"ABCD"[i]}</span>
                  {option}
                </button>
              ))}
            </div>
            {answer !== null && (
              <div className="quiz-feedback" aria-live="polite">
                <p>
                  {answer === q.correct ? "That’s right. " : "Not quite. "}
                  {q.explain}
                </p>
                <button
                  onClick={() => {
                    if (index === questions.length - 1) setDone(true);
                    else {
                      setIndex((i) => i + 1);
                      setAnswer(null);
                    }
                  }}
                >
                  {index === questions.length - 1
                    ? "SEE YOUR SCORE"
                    : "NEXT QUESTION"}{" "}
                  →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
