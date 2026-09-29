export type Work = {
  name: string;
  status: string;
  text: string;
  href: string;
  label: string;
};

export const SHIPPED: Work[] = [
  {
    name: "SnappyZones",
    status: "macOS",
    text: "Saját zónákra illeszti az ablakokat. Nem az élre húzás, hanem a te elrendezésed.",
    href: "https://snappyzones.com",
    label: "snappyzones.com",
  },
  {
    name: "SessionGuard",
    status: "macOS",
    text: "Menüsoros segéd, hogy egy meeting vagy egy hosszú feladat ne veszítse el a bejelentkezett munkamenetet.",
    href: "https://sessionguard.net",
    label: "sessionguard.net",
  },
  {
    name: "WalkAway",
    status: "macOS",
    text: "Ha elmész a géptől, a képernyő zárol. A futó munkák közben nem alszik el a Mac.",
    href: "https://tenprintsoftware.com",
    label: "tenprintsoftware.com",
  },
  {
    name: "MarkSweep",
    status: "macOS",
    text: "Megjelöli a felesleges Gmailt, és átnézés után a Kukába söpri. Magától nem töröl.",
    href: "https://github.com/fgalyasz/MarkSweep",
    label: "GitHub",
  },
];

export const WORKSHOP: Work[] = [
  {
    name: "TenPrint Software",
    status: "műhely",
    text: "A saját macOS alkalmazások otthona. Egy feladat, rendesen megcsinálva, előfizetés nélkül.",
    href: "https://tenprintsoftware.com",
    label: "tenprintsoftware.com",
  },
  {
    name: "Vocal Alchemist",
    status: "stúdió",
    text: "A zeneszerzés gépezete: énekizolálás, hangmagasság, hangkonverzió és hangszerelés egy pipeline-ban.",
    href: "/zeneszerzes",
    label: "A módszer",
  },
  {
    name: "Photo Organizer",
    status: "fotó",
    text: "A forrásmappát nem bántja. A képeket a beállított minta szerint másolja a rendező könyvtárba.",
    href: "/fototechnika",
    label: "Fotótechnika",
  },
];
