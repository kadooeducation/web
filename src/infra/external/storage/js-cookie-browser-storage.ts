import { BrowserStorage } from "./browser-storage";
import Cookies from "js-cookie";

export class JsCookieBrowserStorage implements BrowserStorage {
  get(name: string): string | null {
    return Cookies.get(name) ?? null;
  }

  set(name: string, value: string): void {
    const TWO_HOURS = 4 / 48;

    Cookies.set(name, value, {
      path: "/",
      expires: TWO_HOURS,
      sameSite: "Lax",
    });
  }

  delete(name: string): void {
    Cookies.remove(name);
  }
}

export const jsCookieBrowserStorage = new JsCookieBrowserStorage();
