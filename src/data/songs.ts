export type Movement = {
  index: string;
  title: string;
  text: string;
};

export const MOVEMENTS: Movement[] = [
  {
    index: "01",
    title: "Izolálás",
    text: "A nyers felvételből a Demucs emeli ki az éneket. A dalszerzés a tiszta szólamon kezdődik, nem a szoba zaján.",
  },
  {
    index: "02",
    title: "Hangmagasság",
    text: "A Parselmouth formánst tartó korrekciót ad. A hang a helyére kerül, a testessége megmarad.",
  },
  {
    index: "03",
    title: "Artikuláció",
    text: "A self-SVC, RVC-vel, énekesi szintű artikuláció felé viszi a saját hangot. Nem másik embert keresek, hanem a felvétel jobb változatát.",
  },
  {
    index: "04",
    title: "Hangszerelés",
    text: "A megtisztított ének adja a hangszerelés alapját. A kíséret a dallamhoz igazodik, nem egy kész loopra énekelek rá.",
  },
  {
    index: "05",
    title: "Mix",
    text: "A szólamok egymáshoz igazítása, gain és hangerő. A cél egy masterre kész csomag: mix, sávok, metaadat.",
  },
];

export const SONGS: { title: string; note: string }[] = [];
