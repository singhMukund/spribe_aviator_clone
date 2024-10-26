import { Graphics } from 'pixi.js';

export class MultiplierCurve {
  private curve: Graphics;
  private startX: number;
  private startY: number;

  constructor(startX: number, startY: number) {
    this.curve = new Graphics();
    this.startX = startX;
    this.startY = startY;
  }

  public getDisplayObject(): Graphics {
    return this.curve;
  }

  public drawCurve(curveMultiplier: number, planeX: number, screenHeight: number): void {
    // this.curve.clear(); 
    this.curve.setStrokeStyle({ color: 0xff0000, width: 5 });
    this.curve.moveTo(this.startX, screenHeight - 100);
    
    for (let x = this.startX; x < planeX; x += 10) {
      let y = screenHeight - 100 - Math.pow((x - this.startX) * 0.01, 2); // Curve formula
      this.curve.lineTo(x, y);
    }
  }

  public resetCurve(): void {
    this.curve.clear();
  }
}
