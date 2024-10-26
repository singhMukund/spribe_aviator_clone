import { Ticker } from 'pixi.js';
import { AviatorPlane } from './AviatorPlane';
import { MultiplierCurve } from './MultiplierCurve';

export class GameManager {
  private ticker: Ticker;
  private plane: AviatorPlane;
  private curve: MultiplierCurve;
  private gameActive: boolean;
  private curveMultiplier: number;
  private crashTime: number;
  private screenHeight: number;

  constructor(plane: AviatorPlane, curve: MultiplierCurve, screenHeight: number) {
    this.plane = plane;
    this.curve = curve;
    this.screenHeight = screenHeight;

    this.ticker = new Ticker();
    this.gameActive = false;
    this.curveMultiplier = 1;
    this.crashTime = Math.random() * 10 + 3; // Random crash time between 3 and 10 seconds

    // Update to pass 'this' as context and handle the ticker correctly
    this.ticker.add(this.update, this);
    this.ticker.start();
  }

  public startGame(): void {
    this.gameActive = true;
    this.curveMultiplier = 1;
    this.crashTime = Math.random() * 10 + 3; // Reset random crash time
    this.plane.resetPosition();
    this.curve.resetCurve();
  }

  private update(ticker: Ticker): void {
    if (!this.gameActive) return;

    const delta = ticker.deltaMS / 1000; // Convert delta to seconds

    // Increase the curve multiplier over time
    this.curveMultiplier += delta * 0.5; // Adjust growth rate

    // Update the curve and the plane's position
    this.curve.drawCurve(this.curveMultiplier, this.plane.getDisplayObject().position.x, this.screenHeight);
    this.plane.updatePosition(delta, this.curveMultiplier, this.screenHeight);

    // Check if the game should crash
    if (ticker.lastTime >= this.crashTime * 1000) {
      this.crash();
    }
  }

  public cashOut(): void {
    if (this.gameActive) {
      console.log(`Player cashed out at multiplier: ${this.curveMultiplier}`);
      this.endGame();
    }
  }

  private crash(): void {
    console.log('The plane crashed!');
    // this.endGame();
  }

  private endGame(): void {
    // this.gameActive = false;
    // setTimeout(() => this.startGame(), 1000); // Restart the game after 3 seconds
  }
}
