import { Container, Graphics } from "pixi.js";

export class AviatorShape extends Container {

    private iAviatorShape !: Graphics;
    private keys: { [key: string]: boolean } = {};

    constructor() {
        super();
        this.initShape();
        this.addChild(this.iAviatorShape);
        this.position.set((window.innerWidth - this.width) / 2, (window.innerHeight - this.height));
        // this.position.set(win, 100);
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));

    }

    private initShape(): void {
        this.iAviatorShape = new Graphics();
        this.iAviatorShape.beginFill(0xffd700);
        this.iAviatorShape.moveTo(0, 0);
        this.iAviatorShape.lineTo(-20, 40);
        this.iAviatorShape.lineTo(20, 40);
        this.iAviatorShape.lineTo(0, 0);
        this.iAviatorShape.endFill();
        this.iAviatorShape.beginFill(0x888888);
        this.iAviatorShape.drawRect(-30, 30, 60, 10);
        this.iAviatorShape.endFill();

    }

    onKeyDown(e: KeyboardEvent): void {
        this.keys[e.code] = true;
    }
    
    onKeyUp(e: KeyboardEvent): void {
        this.keys[e.code] = false;
    }
    
    moveAviator(delta: number): void {
        if (this.keys["ArrowUp"]) {
            this.iAviatorShape.y -= 5 * delta;
        }
        if (this.keys["ArrowDown"]) {
            this.iAviatorShape.y += 5 * delta;
        }
        if (this.keys["ArrowRight"]) {
            this.iAviatorShape.x += 5 * delta;
        }
    }

    update(delta : number) :void{
        this.moveAviator(1);
    }
}