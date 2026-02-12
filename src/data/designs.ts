import designGalaxy from "@/assets/design-galaxy.png";
import designAnime from "@/assets/design-anime.png";
import designAbstract from "@/assets/design-abstract.png";
import designNature from "@/assets/design-nature.png";
import designCute from "@/assets/design-cute.png";
import designBotanical from "@/assets/design-botanical.png";

export interface Design {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

export const designs: Design[] = [
  { id: "1", name: "Neon Galaxy", image: designGalaxy, price: 500, category: "Dark" },
  { id: "2", name: "Anime Rage", image: designAnime, price: 500, category: "Anime" },
  { id: "3", name: "Geo Bold", image: designAbstract, price: 500, category: "Abstract" },
  { id: "4", name: "Mountain Mist", image: designNature, price: 500, category: "Nature" },
  { id: "5", name: "Kawaii Friend", image: designCute, price: 500, category: "Cute" },
  { id: "6", name: "Gold Botanical", image: designBotanical, price: 500, category: "Minimal" },
];

export const categories = ["All", "Anime", "Dark", "Abstract", "Nature", "Cute", "Minimal"];
