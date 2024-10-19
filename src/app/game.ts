// Game.ts
import { Application, Container, Filter, Graphics, Loader, Sprite, Text, TextStyle, Texture, Ticker, autoDetectRenderer, filters, utils } from 'pixi.js';
import { CommonConfig } from '../Common/CommonConfig';
import { CommonEvents } from '@/Common/CommonEvents';


export class Game {
  protected static _the: Game;
  public app: Application;
  private loader!: Loader;
  private gameContainer!: Container;
  private isLocaltesting: boolean = false;


  static get the(): Game {
    if (!Game._the) {
      Game._the = new Game();
    }

    return Game._the;
  }

  constructor() {
    if (Game._the == null) Game._the = this;
    
    this.app = new Application({
      // backgroundColor: 0x7F88FD,
      width: window.innerWidth,
      height: window.innerHeight,
      resolution: 1,
      resizeTo: window,
      autoDensity: true,
    });
    const pixiContainer = document.getElementById('pixi-container');
    if (pixiContainer) {
      pixiContainer.appendChild(this.app.view);
    }
    this.init();
  }

  init(): void {

    this.gameContainer = new Container();
    this.app.stage.addChild(this.gameContainer);
    this.loader = this.app.loader;
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
        this.loader.load(() => {
          resolve();
        });
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
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        return;
      } else {
       
      }
    });

    // 
  }



  resize() {
    this.app.stage.emit("RESIZE_THE_APP");
  }


}
