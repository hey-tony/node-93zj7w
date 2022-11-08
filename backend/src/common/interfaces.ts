import { Readable } from "stream";

export interface HapiRoutePayload {
  file: HapiPayloadFile;
}

export interface HapiPayloadFile extends Readable {
  hapi: {
    filename: string;
    headers: string[];
  }
}