import { Encoder } from "./core/encoder/Encoder";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

function main() {
    const rawMessage = prompt("Digite o texto para gerar o código de barras: ");
    
    if (!rawMessage || !rawMessage.trim()) {
        console.log("Aviso: O texto não pode ser vazio.");
        return;
    }

    const encoder = new Encoder(rawMessage);
    encoder.encodeMessage(rawMessage);
}

main();