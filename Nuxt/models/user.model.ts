import type { Market } from "./market.model";

export interface User {
  username: string;
  email: string;
  password: string;
  provider: string;
  resetPasswordToken: string;
  confirmationToken: string;
  confirmed: boolean;
  blocked: boolean;
  markets_favorite: Market[] | null;
}
