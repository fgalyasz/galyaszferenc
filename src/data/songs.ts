export type Movement = {
  index: string;
  title: string;
  text: string;
};

export const MOVEMENTS: Movement[] = [
  {
    index: "01",
    title: "Dallam",
    text: "A dal innen indul. A dallamnak egyedül is meg kell állnia, mielőtt kíséret kerül alá.",
  },
  {
    index: "02",
    title: "Szöveg",
    text: "A szavak a dallam ritmusára ülnek. A szöveg a dalt viszi, nem magyarázza utólag.",
  },
  {
    index: "03",
    title: "Kíséret",
    text: "A hangszerelés a dallamot hordozza. Ami eltakarja az éneket, az kikerül.",
  },
  {
    index: "04",
    title: "Hangzás",
    text: "A felvétel akkor kész, ha a szólamok egymáshoz vannak keverve, és a dal egyben hallatszik.",
  },
];

export const SONGS: { title: string; note: string }[] = [];
