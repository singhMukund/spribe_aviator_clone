import { Graphics } from 'pixi.js';

export class AviatorPlane {
  private plane: Graphics;
  private startX: number;
  private startY: number;

  constructor(startX: number, startY: number) {
    this.plane = new Graphics();
    this.startX = startX;
    this.startY = startY;
    this.createPlane();
    this.resetPosition();
  }

  private createPlane(): void {
    // Draw the plane as a simple triangle
    this.plane.fill(0xffd700);
    this.plane.moveTo(0, 0);
    this.plane.lineTo(-10, 20);
    this.plane.lineTo(10, 20);
    this.plane.lineTo(0, 0);
    this.plane.endFill();
  }

  public getDisplayObject(): Graphics {
    return this.plane;
  }

  public updatePosition(delta: number, curveMultiplier: number, screenHeight: number): void {
    this.plane.position.x += delta * 5; // Move along x-axis
    this.plane.position.y = screenHeight - 100 - Math.pow(curveMultiplier, 2); // Follow the curve formula
  }

  public resetPosition(): void {
    this.plane.position.set(this.startX, this.startY);
  }
}
