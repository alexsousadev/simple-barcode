import { Encoder } from "./core/encoder/Encoder";

const rawMessage = "casa23"
const encoder = new Encoder(rawMessage)
encoder.encodeMessage(rawMessage)