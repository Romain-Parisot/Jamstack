import type { Image } from "~/models/strapi.model";

export interface Market {
  id: number;
  ticker: string;
  name: string;
  price: number;
  marketcap: number;
  shares: number;
  image: Image;
}
