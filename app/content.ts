export const source = {
  personal:
    "https://www.theplayerstribune.com/articles/harry-kane-tottenham-zero-to-100",
  kane: "https://harrykane.com/pages/my-story",
  spurs: "https://www.tottenhamhotspur.com/the-club/history/legends/harry-kane",
  bayern: "https://fcbayern.com/en/teams/first-team/harry-kane",
  title:
    "https://fcbayern.com/en/news/2025/05/harry_kane_defends_top_scorers_canon",
  family:
    "https://uk.sports.yahoo.com/news/life-munich-starting-feel-home-090040110.html",
} as const;

export const filmChapters = [
  { id: "beginning", title: "The beginning", year: "1993—2004" },
  { id: "rejection", title: "The closed doors", year: "YOUTH YEARS" },
  { id: "tottenham", title: "One of our own", year: "2011—2023" },
  { id: "england", title: "A nation’s hopes", year: "2015—2024" },
  { id: "bayern", title: "The leap", year: "2023—2025" },
  { id: "ballondor", title: "The pursuit of gold", year: "THE DREAM" },
];

export const milestones = [
  {
    year: "2011",
    title: "A first taste of senior football.",
    body: "Leyton Orient offered league experience. Later, Millwall’s fight to stay up taught him that results could determine a teammate’s livelihood. The loans became an education in responsibility.",
    source: source.personal,
  },
  {
    year: "2012",
    title: "A broken foot. Another interruption.",
    body: "A fractured fifth metatarsal interrupted his Norwich loan. Tottenham announced surgery and an expected eight-week absence. Progress was anything but a straight line.",
    source: "https://www.tottenhamhotspur.com/news/1027598/harry-kane-update",
  },
  {
    year: "2013",
    title: "The doubt was real.",
    body: "Struggling to get into Leicester’s team, Kane wondered how he could ever play for Spurs. His family helped him keep going. Tom Brady’s overlooked beginnings gave him a different way to see his own.",
    source: source.personal,
  },
  {
    year: "2015",
    title: "The breakthrough becomes a statement.",
    body: "Twenty-one Premier League goals in 2014/15 brought the PFA Young Player of the Year award. Then came consecutive league Golden Boots in 2015/16 and 2016/17.",
    source: source.spurs,
  },
  {
    year: "2019",
    title: "One match from the biggest prize.",
    body: "An ankle injury against Manchester City interrupted the run-in. He recovered to start the Champions League final, but Liverpool won 2–0. Tottenham’s historic run ended in Madrid.",
    source:
      "https://www.tottenhamhotspur.com/news/996607/injury-update-harry-kane-dele-alli",
  },
  {
    year: "2021",
    title: "More than a finisher.",
    body: "Kane won both the Premier League Golden Boot and Playmaker award in 2020/21. His partnership with Son Heung-min had made him a creator as well as the man at the end of the move.",
    source: source.spurs,
  },
  {
    year: "2023",
    title: "A record that belongs to him.",
    body: "He passed Jimmy Greaves and finished his Spurs career with 280 competitive goals in 435 appearances. The boy from the academy had become the club’s record goalscorer.",
    source: source.spurs,
  },
];

export const seasons = [
  {
    id: "spurs",
    label: "Tottenham / complete spell",
    goals: 280,
    games: 435,
    competition: "All competitive first-team matches · 2011–2023",
    source: source.spurs,
  },
  {
    id: "pl",
    label: "Tottenham / Premier League",
    goals: 213,
    games: 317,
    competition: "Premier League only · completed Tottenham career",
    source: source.spurs,
  },
  {
    id: "b24",
    label: "Bayern / 2023–24",
    goals: 36,
    games: 32,
    competition: "Bundesliga only · 2023/24 season",
    source: source.bayern,
  },
  {
    id: "b25",
    label: "Bayern / 2024–25",
    goals: 26,
    games: 31,
    competition: "Bundesliga only · 2024/25 season",
    source:
      "https://www.bundesliga.com/en/bundesliga/news/harry-kane-2024-25-top-scorer-second-time-bayern-munich-most-goals-award-32191",
  },
];

export function goalsPerGame(goals: number, games: number) {
  return games > 0 ? (goals / games).toFixed(2) : "0.00";
}

export const photographs = [
  {
    file: "/media/spurs.webp",
    title: "Tottenham v Manchester City, Nashville · 29 July 2017",
    author: "Brad Tutterow",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    url: "https://commons.wikimedia.org/wiki/File:Harry_Kane_(35805453874).jpg",
  },
  {
    file: "/media/england.webp",
    title: "England training, World Cup · 13 June 2018",
    author: "Кирилл Венедиктов / soccer.ru",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    url: "https://commons.wikimedia.org/wiki/File:Harry_Kane_in_Russia_2.jpg",
  },
  {
    file: "/media/bayern.webp",
    title: "Bayern v Salzburg, friendly · 6 January 2025",
    author: "Werner100359",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    url: "https://commons.wikimedia.org/wiki/File:FC_Red_Bull_Salzburg_gegen_Bayern_München_(2025-01-06_Testspiel)_16_(cropped).jpg",
  },
  {
    file: "/media/shirt.webp",
    title: "Kane’s 2023/24 shirt, Allianz Arena museum · 25 November 2023",
    author: "SonoGrazy",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    url: "https://commons.wikimedia.org/wiki/File:Allianz_Arena_(25-11-2023)_08.jpg",
  },
];
