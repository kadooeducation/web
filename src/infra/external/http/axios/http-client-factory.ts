import { jsCookieBrowserStorage } from "../../storage/js-cookie-browser-storage";
import { HttpClient } from "../http-client";
import { AxiosAdapter } from "./adapter";
import { AxiosAdapterServer } from "./axios-adapter-server";


export class HttpClientFactory {
  static create(): HttpClient {
    const isServer = typeof window === 'undefined';

    if (isServer) {
      return new AxiosAdapterServer();
    }

    return new AxiosAdapter(jsCookieBrowserStorage);
  }

  
}