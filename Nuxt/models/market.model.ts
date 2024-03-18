import type { Image } from "~/models/strapi.model";
import type { User } from "./user.model";

export interface Market {
  id: number;
  ticker: string;
  name: string;
  price: number;
  volume: number;
  marketcap: number;
  shares: number;
  image: Image;
  favorite: User[] | null;
  slug: string;
}
