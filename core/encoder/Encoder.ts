import { Conversor } from "../conversor/Conversor";


enum CodeMode {
    MODE_A  = 104,
    MODE_B  = 105,
}

const startValues = {
    [CodeMode.MODE_B]: 104,
    [CodeMode.MODE_A]: 105
}

const startSymbols = new Map<CodeMode, string>([ // Start symbols: Code A and Code B
    [CodeMode.MODE_A, "11010000100"], // Start Code A
    [CodeMode.MODE_B, "11010010000"] // Start Code B
])

const charsModeA = new Map<string, number>([
    
])

// Code B Character values
const charsModeB = new Map<string, number>([
    [" ", 0],
    ["!", 1],
    ["\"", 2],
    ["#", 3],
    ["$", 4],
    ["%", 5],
    ["&", 6],
    ["'", 7],
    ["(", 8],
    [")", 9],
    ["*", 10],
    ["+", 11],
    [",", 12],
    ["-", 13],
    [".", 14],
    ["/", 15],
    ["0", 16],
    ["1", 17],
    ["2", 18],
    ["3", 19],
    ["4", 20],
    ["5", 21],
    ["6", 22],
    ["7", 23],
    ["8", 24],
    ["9", 25],
    [":", 26],
    [";", 27],
    ["<", 28],
    ["=", 29],
    [">", 30],
    ["?", 31],
    ["@", 32],
    ["A", 33],
    ["B", 34],
    ["C", 35],
    ["D", 36],
    ["E", 37],
    ["F", 38],
    ["G", 39],
    ["H", 40],
    ["I", 41],
    ["J", 42],
    ["K", 43],
    ["L", 44],
    ["M", 45],
    ["N", 46],
    ["O", 47],
    ["P", 48],
    ["Q", 49],
    ["R", 50],
    ["S", 51],
    ["T", 52],
    ["U", 53],
    ["V", 54],
    ["W", 55],
    ["X", 56],
    ["Y", 57],
    ["Z", 58],
    ["[", 59],
    ["\\", 60],
    ["]", 61],
    ["^", 62],
    ["_", 63],
    ["`", 64],
    ["a", 65],
    ["b", 66],
    ["c", 67],
    ["d", 68],
    ["e", 69],
    ["f", 70],
    ["g", 71],
    ["h", 72],
    ["i", 73],
    ["j", 74],
    ["k", 75],
    ["l", 76],
    ["m", 77],
    ["n", 78],
    ["o", 79],
    ["p", 80],
    ["q", 81],
    ["r", 82],
    ["s", 83],
    ["t", 84],
    ["u", 85],
    ["v", 86],
    ["w", 87],
    ["x", 88],
    ["y", 89],
    ["z", 90],
    ["{", 91],
    ["|", 92],
    ["}", 93],
    ["~", 94],
    ["DEL", 95],
    ["FNC3", 96],
    ["FNC2", 97],
    ["SHIFT", 98],
    ["CODE_C", 99],
    ["CODE_A", 100],
    ["FNC4", 101],
    ["FNC1", 102]
]);

// Code B Binary patterns (valores de 0 a 106)
const binariesModeB: string[] = [
    "11011001100", "11001101100", "11001100110", "10010011000", "10010001100",
    "10001001100", "10011001000", "10011000100", "10001100100", "11001001000",
    "11001000100", "11000100100", "10110011100", "10011011100", "10011001110",
    "10111001100", "10011101100", "10011100110", "11001110010", "11001011100",
    "11001001110", "11011100100", "11001110100", "11101101110", "11101001100",
    "11100101100", "11100100110", "11101100100", "11100110100", "11100110010",
    "11011011000", "11011000110", "11000110110", "10100011000", "10001011000",
    "10001000110", "10110001000", "10001101000", "10001100010", "11010001000",
    "11000101000", "11000100010", "10110111000", "10110001110", "10001101110",
    "10111011000", "10111000110", "10001110110", "11101110110", "11010001110",
    "11000101110", "11011101000", "11011100010", "11011101110", "11101011000",
    "11101000110", "11100010110", "11101101000", "11101100010", "11100011010",
    "11101111010", "11001000010", "11110001010", "10100110000", "10100001100",
    "10010110000", "10010000110", "10000101100", "10000100110", "10110010000",
    "10110000100", "10011010000", "10011000010", "10000110100", "10000110010",
    "11000010010", "11001010000", "11110111010", "11000010100", "10001111010",
    "10100111100", "10010111100", "10010011110", "10111100100", "10011110100",
    "10011110010", "11110100100", "11110010100", "11110010010", "11011011110",
    "11011110110", "11110110110", "10101111000", "10100011110", "10001011110",
    "10111101000", "10111100010", "11110101000", "11110100010", "10111011110",
    "10111101110", "11101011110", "11110101110",
    "11010000100", // 103 (Start A)
    "11010010000", // 104 (Start B)
    "11010011100", // 105 (Start C)
    "1100011101011" // 106 (Stop)
];

const binariesModeA: string[] = []


export class Encoder {
    private rawMessage: string[] = []
    private messageInBinary: string[] = []
    private currentMode: CodeMode = CodeMode.MODE_B
    private isStart: boolean = true
    private isStop: boolean = false
    private imageMessage: Conversor

    constructor(rawMessage: string){
        this.imageMessage = new Conversor(rawMessage)
    }


    encodeMessage(message: string): string {
        this.rawMessage = message.trim().split("")
        for (let i = 0; i < message.length; i++) {
            const char = message[i] ?? "";

            // Verify if the message is at the start
            if(this.isStart){
                this.messageInBinary.push(startSymbols.get(this.identifyMode(char)) ?? "");
                this.isStart = false
            }

            this.messageInBinary.push(this.encodeChar(char))

            // Verify if the message is at the end
            if(i == message.length - 1){
                this.checkSumGenerator();
                this.messageInBinary.push(binariesModeB[106] ?? "");
            }
        }

        const messageInBinaryStr = this.messageInBinary.join(",")
        this.imageMessage = new Conversor(message);
        this.imageMessage.binaryToImage(this.messageInBinary)
        return messageInBinaryStr;
    }

    getMessageInBinary(): string[] {
        return this.messageInBinary
    }

    // Identify the mode of the character
    identifyMode(char: string) {
        if(charsModeA.has(char)){
            return CodeMode.MODE_A
        }else if(charsModeB.has(char)){
            return CodeMode.MODE_B
        }else{
            throw new Error(`Character ${char} not found`)
        }
    }

    // Encode each character to binary pattern
    encodeChar(char: string): string {

        const typeMode: CodeMode = this.identifyMode(char)

        let integerValueOfChar: number | undefined

        switch (typeMode) {
            case CodeMode.MODE_B:
                integerValueOfChar = charsModeB.get(char)
                return binariesModeB[integerValueOfChar  ?? 0] ?? "";
            case CodeMode.MODE_A:
                integerValueOfChar = charsModeA.get(char)
                return binariesModeA[integerValueOfChar ?? 0] ?? "";
            default:
                throw new Error(`Character ${char} not found`)
        }
    }

    getChar(char: string, mode: CodeMode) {
        switch (mode) {
            case CodeMode.MODE_A:
                return charsModeA.get(char)
            case CodeMode.MODE_B:
                return charsModeB.get(char)
            default:
                throw new Error(`Character ${char} not found`)
        }
    }

    getRawMessage(): string[] {
        return this.messageInBinary
    }


    getValueOfMode(){
        return startValues[this.currentMode]
    }


    checkSumGenerator(): void {

        let sum = this.getValueOfMode()

        for(let i = 0; i < this.rawMessage.length; i++){
           const char = this.rawMessage[i] ?? "";
           let charValue = this.getChar(char, this.currentMode);
           if(!charValue){
            throw new Error(`Character ${char} not found`)
           }
           sum += (i + 1) * charValue;
        }

        const checksumValue = sum % 103
        this.messageInBinary.push(binariesModeB[checksumValue] ?? "");
    }

}