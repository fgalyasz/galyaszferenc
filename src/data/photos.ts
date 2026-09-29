export type Plate = {
  tone: string;
  title: string;
  text: string;
};

export const PLATES: Plate[] = [
  {
    tone: "warm",
    title: "Esküvő",
    text: "A nap ritmusa a fontos: a készülődés csendje, a szertartás, a terem zaja. Sokat exponálok, hogy a válogatásból album legyen, ne egyetlen póz.",
  },
  {
    tone: "cool",
    title: "Portré",
    text: "Karaktert keresek, nem sminket. A háttér akkor jó, ha nem versenyez az arccal, a fénynek pedig iránya van.",
  },
  {
    tone: "gold",
    title: "Divat és glamour",
    text: "Modellportfólió és glamour ugyanazt kéri: tiszta vonal, tudatos tartás, és olyan utómunka, ami öt év múlva sem tűnik trükknek.",
  },
  {
    tone: "rose",
    title: "Művészi akt",
    text: "Forma, fény és megegyezés. A kép a test rajzáról szól, nem a meglepetésről. A beállítás előre tiszta.",
  },
  {
    tone: "green",
    title: "Rendezvény",
    text: "Ott kell lenni, ahol a pillanat megtörténik, és közben láthatatlannak maradni. A történet a teremé, nem a fotósé.",
  },
  {
    tone: "violet",
    title: "Egyházi alkalom",
    text: "A szertartás rendje határolja a mozgást. Csendesebb géphasználat, tisztelet a liturgia iránt, és képek, amelyek a közösségnek is megmaradnak.",
  },
];
