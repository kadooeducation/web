"server only";

import { PinataSDK } from "pinata";

console.log(process.env);
console.log(process.env.NEXT_PUBLIC_GATEWAY_URL);

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});
