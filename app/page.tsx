import Image from "next/image";
import BundesligaShield from "./bundesliga-shield";
import { Origins } from "./origins";
import { CareerQuiz, InteractiveZone } from "./interactive-zone";
import {
  FilmMotion,
  FilmNav,
  FanPoll,
  MilestoneExplorer,
  NumberNine,
  StatExplorer,
} from "./film-interactions";
import { GoldFinale } from "./gold-finale";
import { photographs, source } from "./content";

function ChapterLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <p className="kicker">
      <span>{number}</span> / {children}
    </p>
  );
}

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#beginning">
        Skip opening scene
      </a>
      <FilmNav />
      <FilmMotion />
      <section id="prologue" className="film-hero">
        <Image
          className="hero-photo"
          src="/media/spurs.webp"
          alt="Harry Kane playing for Tottenham against Manchester City in Nashville, July 2017"
          fill
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="hero-scrim" />
        <div className="film-grain" aria-hidden="true" />
        <div className="hero-topline">
          <span>AN INDEPENDENT FOOTBALL DOCUMENTARY</span>
          <span>LONDON → MUNICH</span>
        </div>
        <div className="hero-title">
          <p className="kicker">HARRY KANE / THE PURSUIT OF GOLD</p>
          <h1>
            NOTHING
            <br />
            CAME <em>EASY.</em>
          </h1>
          <div className="hero-summary">
            <p>
              Some careers are a straight line.
              <br />
              This was never one of them.
            </p>
            <a className="begin-link" href="#beginning">
              BEGIN THE STORY <span>↓</span>
            </a>
          </div>
        </div>
        <div className="hero-foot">
          <span>01 / THE LONG WAY TO THE TOP</span>
          <span>NASHVILLE, 2017 · BRAD TUTTEROW</span>
          <a href="#credits">IMAGE CREDITS ↗</a>
        </div>
      </section>
      <div className="film-index">
        <p>
          SIX CHAPTERS.
          <br />
          <span>ONE UNFINISHED STORY.</span>
        </p>
        <a href="#tottenham">
          THE ROOTS <span>01—03</span>
        </a>
        <a href="#bayern">
          THE LEAP <span>05</span>
        </a>
        <a href="#fan-zone">
          THE NUMBERS <span>EXPLORE ↗</span>
        </a>
        <a href="#ballondor">
          THE GOLD <span>06</span>
        </a>
      </div>

      <section id="beginning" className="beginning chapter-pad light-chapter">
        <ChapterLabel number="01">THE BEGINNING / 1993—2004</ChapterLabel>
        <div className="origin-spread">
          <div>
            <h2>
              Before the roar.
              <br />
              <em>
                Just a boy
                <br />
                and a ball.
              </em>
            </h2>
            <p className="section-lede">
              Walthamstow born. Chingford raised. Football in the park with his
              dad and brother. Two trees for goalposts.
            </p>
            <a className="source-link" href={source.personal}>
              Kane’s own account ↗
            </a>
          </div>
          <aside className="birth-record">
            <span>THE ORIGIN FILE</span>
            <strong>
              28.07
              <br />
              1993
            </strong>
            <dl>
              <dt>Born</dt>
              <dd>Walthamstow, London</dd>
              <dt>Raised</dt>
              <dd>Chingford</dd>
              <dt>Grassroots</dt>
              <dd>Ridgeway Rovers</dd>
            </dl>
            <small>Biographical record, not a childhood photograph.</small>
          </aside>
        </div>
        <Origins />
      </section>

      <section id="rejection" className="rejection chapter-pad">
        <ChapterLabel number="02">REJECTION & DETERMINATION</ChapterLabel>
        <div className="rejection-layout">
          <span className="no-word" aria-hidden="true">
            NO.
          </span>
          <div>
            <h2>
              A closed door.
              <br />
              <em>Not the ending.</em>
            </h2>
            <p>
              Arsenal released him as a child. There was no guarantee another
              academy would take him. His dad’s response was to keep going. Kane
              returned to local football before a Watford trial opened another
              route to Tottenham.
            </p>
            <p>
              Rejection did not make success inevitable. It gave him something
              to work through.
            </p>
            <a className="source-link" href={source.personal}>
              Read “Zero to 100”, by Harry Kane ↗
            </a>
            <div className="youth-route">
              <span>RIDGEWAY</span>
              <i>→</i>
              <span>ARSENAL</span>
              <i>→</i>
              <span>WATFORD</span>
              <i>→</i>
              <span>SPURS</span>
            </div>
          </div>
        </div>
      </section>

      <section id="tottenham" className="tottenham light-chapter">
        <div className="chapter-pad spurs-heading">
          <ChapterLabel number="03">
            THE TOTTENHAM YEARS / 2011—2023
          </ChapterLabel>
          <h2>
            ONE OF
            <br />
            <em>OUR OWN.</em>
          </h2>
          <p className="section-lede">
            The loans. The doubt. The breakthrough.
            <br />
            Then the goals that rewrote the record book.
          </p>
        </div>
        <figure className="spurs-photo">
          <Image
            src="/media/spurs.webp"
            alt="Kane in Tottenham white during the 2017 Nashville friendly"
            width={1800}
            height={1196}
            sizes="100vw"
          />
          <figcaption>
            29 JULY 2017 / TOTTENHAM v MANCHESTER CITY · NASHVILLE · BRAD
            TUTTEROW
          </figcaption>
        </figure>
        <div className="chapter-pad">
          <div className="record-row">
            <strong>
              <b data-count="280">280</b><span>COMPETITIVE GOALS</span>
            </strong>
            <p>
              Tottenham’s record goalscorer.
              <br />
              435 first-team appearances.
              <br />A completed club chapter, not a career total.
            </p>
            <a href={source.spurs} className="source-link">
              Club record ↗
            </a>
          </div>
          <MilestoneExplorer />
          <div className="duality">
            <div>
              <span>THE CONNECTION</span>
              <h3>Kane × Son.</h3>
              <p>
                A scorer who could see the pass. A partnership built on
                movement, timing and trust. In 2020/21, Kane won both the
                league’s Golden Boot and Playmaker award.
              </p>
            </div>
            <div>
              <span>THE HEARTBREAK</span>
              <h3>Madrid, 2019.</h3>
              <p>
                An ankle injury. A recovery. A place in Tottenham’s first
                Champions League final. Liverpool won 2–0. The night that might
                have changed everything ended one match short.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="england" className="england">
        <figure className="england-image">
          <Image
            className="parallax-photo"
            src="/media/england.webp"
            alt="Harry Kane at England training during the 2018 World Cup"
            fill
            sizes="(max-width: 800px) 100vw, 45vw"
          />
          <figcaption>RUSSIA, 2018 / КИРИЛЛ ВЕНЕДИКТОВ · SOCCER.RU</figcaption>
        </figure>
        <div className="england-story">
          <ChapterLabel number="04">ENGLAND / A PARALLEL PURSUIT</ChapterLabel>
          <h2>
            A NATION’S
            <br />
            <em>HOPES.</em>
          </h2>
          <p className="section-lede">
            The club story never paused. Another one ran alongside it.
          </p>
          <div className="tournament-ledger">
            <details open>
              <summary>
                <span>2015</span> The first goal
              </summary>
              <p>
                He scored on his senior debut against Lithuania in March 2015.
                The international journey began almost immediately with a goal.
              </p>
            </details>
            <details>
              <summary>
                <span>2018</span> Captain. Golden Boot.
              </summary>
              <p>
                Six goals at the World Cup, the tournament’s Golden Boot and an
                England semi-final. A new generation had found its captain.
              </p>
            </details>
            <details>
              <summary>
                <span>2021</span> One kick from glory
              </summary>
              <p>
                The delayed EURO 2020 final was played in 2021. Italy won on
                penalties at Wembley. England’s wait continued.
              </p>
            </details>
            <details>
              <summary>
                <span>2022</span> The hardest penalty
              </summary>
              <p>
                Against France, Kane scored from the spot, then sent a second
                penalty over. England lost the World Cup quarter-final 2–1. One
                moment could not erase his contribution, but its weight was
                unmistakable.
              </p>
              <a href="https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2022/france-v-england-world-cup-2022-quarter-final-saturday-10-december-qatar-match-centre">
                Match report ↗
              </a>
            </details>
            <details>
              <summary>
                <span>2023—24</span> Records and another final
              </summary>
              <p>
                He passed Wayne Rooney as England’s record scorer in March 2023.
                At EURO 2024, England reached the final again; Spain won 2–1.
              </p>
            </details>
          </div>
          <a href={source.bayern} className="source-link">
            Tournament record ↗
          </a>
        </div>
      </section>

      <section className="leap" aria-label="From London to Munich">
        <div className="bayern-wipe" />
        <div>
          <span>LONDON</span>
          <span className="leap-arrow">↗</span>
          <span>MUNICH</span>
        </div>
        <p>12 AUGUST 2023 / A NEW COUNTRY. A DIFFERENT CHALLENGE.</p>
      </section>
      <section id="bayern" className="bayern chapter-pad">
        <ChapterLabel number="05">
          THE BAYERN TRANSFORMATION / 2023—2025
        </ChapterLabel>
        <div className="bayern-layout">
          <div>
            <h2>
              SAME HUNGER.
              <br />
              <em>NEW WORLD.</em>
            </h2>
            <p className="section-lede">
              Leaving a club is one decision.
              <br />
              Building a new life takes longer.
            </p>
            <p>
              Initially, Kane stayed in a Munich hotel while his wife and
              children remained in England. A family home followed. By February
              2024, he was describing Munich as starting to feel like home.
            </p>
            <a className="source-link" href={source.family}>
              The family’s transition ↗
            </a>
            <div className="bayern-stat">
              <strong data-count="36">36</strong>
              <p>
                BUNDESLIGA GOALS
                <br />
                2023/24 · 32 APPEARANCES
              </p>
            </div>
            <p>
              The goals travelled. The trophies took longer. His first Bayern
              season brought a European Golden Shoe but no team trophy.
            </p>
            <a href={source.bayern} className="source-link">
              Season record ↗
            </a>
          </div>
          <figure className="bayern-photo">
            <Image
              className="parallax-photo"
              src="/media/bayern.webp"
              alt="Harry Kane in Bayern Munich’s red kit during the Salzburg friendly in January 2025"
              fill
              sizes="(max-width: 800px) 90vw, 45vw"
            />
            <figcaption>
              SALZBURG FRIENDLY / 6 JANUARY 2025 · WERNER100359
            </figcaption>
          </figure>
        </div>
        <div className="first-title">
          <figure>
            <Image
              src="/media/shirt.webp"
              alt="Harry Kane’s number nine shirt displayed at the Allianz Arena museum in November 2023"
              width={900}
              height={1170}
              sizes="(max-width: 800px) 80vw, 25vw"
            />
            <figcaption>2023/24 SHIRT · MUSEUM DISPLAY / SONOGRAZY</figcaption>
          </figure>
          <div>
            <span className="kicker">2024/25 / THE WAIT BREAKS</span>
            <h3>
              Finally,
              <br />
              <em>a champion.</em>
            </h3>
            <p>
              Bayern reclaimed the Bundesliga. Kane scored 26 league goals and
              retained the scoring title. His first major senior team trophy was
              no longer something to imagine.
            </p>
            <a href={source.title} className="source-link">
              Bayern’s season review ↗
            </a>
            <p className="fine-print">
              Historical chapter through the completed 2024/25 season. This
              documentary does not present these numbers as current career
              totals.
            </p>
          </div>
        </div>
        <BundesligaShield />
      </section>

      <section id="fan-zone" className="numbers chapter-pad">
        <ChapterLabel number="EXTRA TIME">GO BEYOND THE STORY</ChapterLabel>
        <div className="section-heading">
          <h2>
            THE NUMBERS.
            <br />
            <em>THE CONTEXT.</em>
          </h2>
          <p>
            Not every total tells the same story.
            <br />
            Choose the competition and the time span.
          </p>
        </div>
        <StatExplorer />
        <NumberNine />
      </section>
      <CareerQuiz />
      <FanPoll />
      <section id="ballondor" className="final-chapter">
        <div className="chapter-pad">
          <ChapterLabel number="06">THE BALLON D’OR DREAM</ChapterLabel>
          <h2>
            HOW DO YOU
            <br />
            <em>MEASURE GREATNESS?</em>
          </h2>
          <p className="section-lede">
            Goals. Creativity. Leadership. Team success.
            <br />A career is more than one number—or one trophy.
          </p>
          <p className="final-context">
            This finale explores the pursuit and the debate. It makes no claim
            that a trophy shown here was won in a specific year. Explore the
            objects as artistic interpretations, then decide what defines the
            legacy for you.
          </p>
        </div>
        <InteractiveZone />
        <GoldFinale />
      </section>
      <section id="credits" className="credits chapter-pad">
        <h2>THE ARCHIVE.</h2>
        <p>
          Independent fan documentary. No affiliation with Harry Kane, his
          clubs, England, France Football or the Ballon d’Or. Historical
          snapshots through 2024/25; chapter-specific source links are provided
          throughout.
        </p>
        <details>
          <summary>Photography & licences +</summary>
          {photographs.map((p) => (
            <p key={p.file}>
              <a href={p.file}>{p.title}</a> — {p.author}.{" "}
              <a href={p.url}>Original photograph</a> ·{" "}
              <a href={p.licenseUrl}>{p.license}</a>. Resized and converted to
              WebP; display crop and colour treatment. Adapted photographic
              assets remain available under the original licence.
            </p>
          ))}
        </details>
        <details>
          <summary>Research & editorial scope +</summary>
          <p>
            <a href={source.personal}>Harry Kane / The Players’ Tribune</a> ·{" "}
            <a href={source.kane}>Harry Kane’s own story</a> ·{" "}
            <a href={source.spurs}>Tottenham’s club archive</a> ·{" "}
            <a href={source.bayern}>FC Bayern player record</a> ·{" "}
            <a href={source.title}>2024/25 scoring record</a>. Accounts of
            childhood ages vary; the documentary avoids over-precise youth
            dates. Poll choices are local to your browser, never global fan
            results.
          </p>
        </details>
        <a className="back-top" href="#prologue">
          BACK TO THE OPENING ↑
        </a>
      </section>
      <footer>
        <span>HK / THE PURSUIT OF GOLD</span>
        <span>THE STORY IS STILL BEING WRITTEN.</span>
      </footer>
    </main>
  );
}
