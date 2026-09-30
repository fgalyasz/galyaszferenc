export type Movement = {
  index: string;
  title: string;
  text: string;
};

export const MOVEMENTS: Movement[] = [
  {
    index: "01",
    title: "Gitár",
    text: "Három-négy évesen kaptam az első akusztikus gitárt. A zene addigra már velem volt, a hangszer innentől a kezemben is.",
  },
  {
    index: "02",
    title: "Furulya",
    text: "Nyolcévesen kezdtem furulyázni. A gitár után ez lett a következő hangszer.",
  },
  {
    index: "03",
    title: "Szintetizátor",
    text: "Tízéves koromtól egyre nagyobb tudású szintetizátorok jöttek. Ma leginkább szoftvereseken dolgozom, néhány fizikai hangszer még megvan.",
  },
  {
    index: "04",
    title: "Dal",
    text: "A szöveget és a zenét is én írom, és magam adom elő. A dalszövegek az életem napi történésein alapulnak.",
  },
];

export const SONGS: { title: string; note: string }[] = [];
