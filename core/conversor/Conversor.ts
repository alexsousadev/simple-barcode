import { createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';


export class Conversor {

    private outputPath: string;

    constructor(rawMessage?: string){
        this.outputPath = path.join(__dirname, "..", "..", `barcodes/${rawMessage || "barcode"}.png`)
    }


    convertBinaryToBars(message: string[]){
        console.log(message)
        const barcode = message.join("").replace(/1/g, "██").replace(/0/g, "  ")
        const quietZone = "  ".repeat(10)
        console.log(quietZone + barcode + quietZone)

        for (let r = 0; r < 10; r++) {
            console.log(quietZone + barcode + quietZone);
        }
    }


    binaryToImage(message: string[]) {

        const binaryMessage = message.join("");

        // Dimensions Config
        const moduleWidth = 3;
        const barcodeHeight = 80;
        const quietZoneModules = 10

        // Configurations Image
        const totalModules = binaryMessage.length + (quietZoneModules * 2)
        const imageWidth = totalModules * moduleWidth;
        const imageHeight = barcodeHeight + 20;

        // Create drawing context 
        const canvas = createCanvas(imageWidth, imageHeight);
        const ctx = canvas.getContext('2d');

        // Define colors
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, imageWidth, imageHeight);
        ctx.fillStyle = "black"

        let currentX = quietZoneModules * moduleWidth;

        // Draw the bars
        for (const module of binaryMessage) {
            if (module === "1") {
                ctx.fillRect(currentX, 10, moduleWidth, barcodeHeight);
            }
            currentX += moduleWidth;
        }

        const buffer = canvas.toBuffer("image/png")
        fs.writeFileSync(this.outputPath, buffer);   
        console.log(`Barcode image saved to ${this.outputPath}`);
    }   

}

export default new Conversor()