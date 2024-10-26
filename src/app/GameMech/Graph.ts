import { Container, Graphics } from "pixi.js";

export class Graph extends Container{
    private x_line !: Graphics;
    private y_line !: Graphics; 
    constructor(){
        super();
        this.init();
    }

    private init() :void{
        // this.x_line = new Graphics({
        //     fillStyle: { color: 0xff0000, alpha: 0.5 },
        //     strokeStyle: { color: 0x00ff00, width: 2 },
        //  });
        this.x_line.beginPath()
        this.x_line.setStrokeStyle({ color: 0xFFFFFF, width: 5 });
        this.x_line.moveTo(0,window.innerHeight - 100)
        this.x_line.lineTo(window.innerWidth,window.innerHeight - 100);
        // this.x_line.e

        this.addChild(this.x_line);
    }
}