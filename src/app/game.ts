// Game.ts
import { Application, Container, Loader, Renderer, Ticker } from 'pixi.js';
import { CommonConfig } from '../Common/CommonConfig';
import { CommonEvents } from '@/Common/CommonEvents';
import { AviatorShape } from './Aviator/AviatorShape';
import { AviatorPlane } from './GameMech/AviatorPlane';
import { MultiplierCurve } from './GameMech/MultiplierCurve';
import { GameManager } from './GameMech/GameManager';
import { Graph } from './GameMech/Graph';


export class Game {
  protected static _the: Game;
  public app: Application;
  private loader!: Loader;
  private gameContainer!: Container;
  private isLocaltesting: boolean = false;
  private ticker!: Ticker;
  private aviatorShape !: AviatorShape;
  private plane!: AviatorPlane;
  private curve!: MultiplierCurve;
  private gameManager!: GameManager;



  static get the(): Game {
    if (!Game._the) {
      Game._the = new Game();
    }

    return Game._the;
  }

  constructor() {
    if (Game._the == null) Game._the = this;

    this.app = new Application();
    this.init();
  }

  async init(): Promise<void> {
    await this.app.init();
    const pixiContainer = document.getElementById('pixi-container');
    if (pixiContainer) {
      pixiContainer.appendChild(this.app.canvas);
    }
    this.app.resize = this.resize.bind(this);
    // this.app.stage.width = window.innerWidth;
    // this.app.stage.width = window.innerHeight;

    this.gameContainer = new Container();
    this.app.stage.addChild(this.gameContainer);
    // this.app.stage.position.set(window.innerWidth/2,window.innerHeight/2);

    this.loadAssetsAndInitialize();
    this.resize();
    window.onresize = this.resize.bind(this);
    window.addEventListener('beforeunload', (event) => {

    });
  }

  private async loadImages() {


    // @ts-ignore
    const loadAssets = () => {
      return new Promise<void>((resolve, reject) => {
        resolve()
        // this.loader.load(() => {
        //   resolve();
        // });
        // @ts-ignore
        this.loader.onError.add((error) => {
          console.error("Error loading assets:", error);
          reject(error);
        });
      });
    };


    try {
      if (this.isLocaltesting) {
        Promise.all([loadAssets()])
          .then(() => {
            // CommonConfig.the.setbrokenCase(true);
            // CommonConfig.the.setLevelsNo(7);
            this.onLoadComplete();
          })
          .catch((error) => {
            console.error("Error during asset loading or login:", error);
          });
      } else {
        Promise.all([loadAssets()])
          .then(() => {
            this.onLoadComplete();
          })
          .catch((error) => {
            console.error("Error during asset loading or login:", error);
          });
      }


    } catch (error) {
      console.error("Error during asset loading or login:", error);
    }
  }

  isIOS(): boolean {
    const audio = document.createElement('audio');
    return audio.canPlayType('audio/ogg; codecs="vorbis"') === '';
    return false
  }



  private loadAssetsAndInitialize() {
    this.loadImages();
    new CommonEvents();
    new CommonConfig();
  }



  private onLoadComplete() {
    // Initialize plane and curve
    this.plane = new AviatorPlane(50, this.app.screen.height - 100);
    this.curve = new MultiplierCurve(50, this.app.screen.height - 100);

    // Add plane and curve to the stage
    this.app.stage.addChild(this.curve.getDisplayObject());
    this.app.stage.addChild(this.plane.getDisplayObject());

    // Initialize the GameManager
    this.gameManager = new GameManager(this.plane, this.curve, this.app.screen.height);

    const graphs = new Graph();
    this.app.stage.addChild(graphs);

    // Start the game
    this.gameManager.startGame();

    window.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        this.gameManager.cashOut();
      }
    });
    document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    return;
  } else {

  }
});
  }

update(ticker: Ticker) {
  this.aviatorShape.update(ticker.deltaMS);
}



resize() {
  // this.app.stage.width = window.innerWidth;

  this.app.stage.emit("RESIZE_THE_APP");
  this.app.renderer.resize(window.innerWidth, window.innerHeight);
}


}
