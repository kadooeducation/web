import { jsCookieBrowserStorage } from "../../storage/js-cookie-browser-storage";
import { HttpClient } from "../http-client";
import { AxiosAdapter } from "./adapter";


export class HttpClientFactory {
  static create(): HttpClient {

    return new AxiosAdapter(jsCookieBrowserStorage);
  }

  
}