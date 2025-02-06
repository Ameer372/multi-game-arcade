import Phaser from "phaser";
import { useEffect, useRef } from "react";

const size = {
  width: 500,
  height: 500,
};
const speedDown = 300;

class StartGameScene extends Phaser.Scene {
  constructor() {
    super("scene-start");
  }

  preload() {
    this.load.image("bg", "/assets/bg.png");
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    this.add.text(size.width / 5, size.height / 3, "Apple Catch Game", {
      font: "35px Arial",
      color: "#ffffff",
      padding: { x: 10, y: 5 },
      backgroundColor: "#000",
    });

    const startButton = this.add
      .text(size.width / 2, size.height / 2, "Start Game", {
        font: "50px Arial",
        color: "#ffffff",
        backgroundColor: "#000",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive();

    startButton.on("pointerover", () => {
      startButton.setStyle({ backgroundColor: "#555", color: "#ffff00" }); // Change color on hover
    });

    startButton.on("pointerout", () => {
      startButton.setStyle({ backgroundColor: "#000", color: "#ffffff" }); // Reset on hover out
    });

    // Restart the game on click
    startButton.on("pointerdown", () => {
      this.scene.start("scene-game");
    });
  }
}

class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Image; // Declare the player property
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys;
  private playerSpeed = speedDown + 50;
  private target!: Phaser.Physics.Arcade.Image;
  private points = 0;
  private textScore!: Phaser.GameObjects.Text;
  private health = 3;
  private textHealth!: Phaser.GameObjects.Text;
  private coinMusic!: Phaser.Sound.BaseSound;
  private bgMusic!: Phaser.Sound.BaseSound;
  private appleDrop!: Phaser.Sound.BaseSound;
  private emitter!: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor() {
    super("scene-game");
  }

  preload() {
    this.load.image("bg", "/assets/bg.png");
    this.load.image("basket", "/assets/basket.png");
    this.load.image("apple", "/assets/apple.png");
    this.load.image("money", "/assets/money.png");
    this.load.audio("coin", "/assets/coin.mp3");
    this.load.audio("bgMusic", "/assets/bgMusic.mp3");
    this.load.audio("appleDrop", "/assets/appleDrop.mp3");
  }

  create() {
    this.appleDrop = this.sound.add("appleDrop");
    this.coinMusic = this.sound.add("coin");
    this.bgMusic = this.sound.add("bgMusic");
    this.bgMusic.play();

    this.add.image(0, 0, "bg").setOrigin(0, 0);

    this.target = this.physics.add.image(0, 0, "apple").setOrigin(0, 0);
    this.target.setX(Math.floor(Math.random() * size.width));
    this.target.setMaxVelocity(0, speedDown);

    this.health = 3;
    this.player = this.physics.add
      .image(0, size.height - 100, "basket")
      .setOrigin(0, 0);
    this.player.setImmovable(true);
    (this.player.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    this.player.setCollideWorldBounds(true);
    this.player.setSize(80, 15).setOffset(10, 70);

    this.physics.add.overlap(
      this.target,
      this.player,
      this.targetHit,
      undefined,
      this
    );

    this.cursor = this.input.keyboard!.createCursorKeys();

    this.textScore = this.add.text(size.width - 120, 10, "Score: 0", {
      font: "25px Arial",
      color: "#ffffff",
    });

    this.textHealth = this.add.text(10, 10, "Health: 3", {
      font: "25px Arial",
      color: "#ffffff",
    });

    this.emitter = this.add.particles(0, 0, "money", {
      speed: 100,
      gravityY: speedDown - 200,
      scale: 0.04,
      duration: 100,
      emitting: false,
    });
    this.emitter.startFollow(
      this.player,
      this.player.width / 2,
      this.player.height / 2,
      true
    );
  }

  update() {
    if (this.points >= 10) {
      this.target.setMaxVelocity(0, speedDown + 300);
    }

    if (this.target.y >= size.height) {
      this.target.y = 0;
      this.target.x = Math.floor(Math.random() * size.width);
      this.playerHit();
    }

    const { left, right } = this.cursor;
    if (left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    } else {
      this.player.setVelocityX(0);
    }

    this.textScore.setText(`Score: ${this.points}`);
  }

  targetHit() {
    this.emitter.start();
    this.coinMusic.play();
    this.target.setY(0);
    this.target.setX(Math.floor(Math.random() * size.width));
    this.points++;
  }

  playerHit() {
    this.health--;
    this.appleDrop.play();
    this.textHealth.setText(`Health: ${this.health}`);

    if (this.health === 0) {
      this.bgMusic.stop();
      this.appleDrop.stop();
      this.registry.set("score", this.points); // Store the score
      this.scene.start("scene-endgame"); // Switch to the end-game scene
    }
  }
}

class GameOverScene extends Phaser.Scene {
  constructor() {
    super("scene-endgame");
  }

  preload() {
    this.load.image("bg", "/assets/bg.png");
  }

  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    this.add
      .text(size.width / 2, size.height / 2 - 50, "Game Over", {
        font: "40px Arial",
        color: "#ff0000",
        backgroundColor: "#fff",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5);

    this.add
      .text(
        size.width / 2,
        size.height / 2,
        `Score: ${this.registry.get("score")}`,
        {
          font: "25px Arial",
          color: "#ffffff",
          backgroundColor: "#000",
          padding: { x: 10, y: 5 },
        }
      )
      .setOrigin(0.5);

    const restartButton = this.add
      .text(size.width / 2, size.height / 2 + 50, "Restart", {
        font: "30px Arial",
        color: "#ffffff",
        backgroundColor: "#000",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive();

    const mainMenuButton = this.add
      .text(size.width / 2, size.height / 2 + 100, "Main Menu", {
        font: "30px Arial",
        color: "#ffffff",
        backgroundColor: "#000",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive();

    restartButton.on("pointerover", () => {
      restartButton.setStyle({ backgroundColor: "#555", color: "#ffff00" }); // Change color on hover
    });

    restartButton.on("pointerout", () => {
      restartButton.setStyle({ backgroundColor: "#000", color: "#ffffff" }); // Reset on hover out
    });

    // Restart the game on click
    restartButton.on("pointerdown", () => {
      this.scene.start("scene-game");
    });

    mainMenuButton.on("pointerover", () => {
      mainMenuButton.setStyle({ backgroundColor: "#555", color: "#ffff00" }); // Change color on hover
    });

    mainMenuButton.on("pointerout", () => {
      mainMenuButton.setStyle({ backgroundColor: "#000", color: "#ffffff" }); // Reset on hover out
    });

    mainMenuButton.on("pointerdown", () => {
      this.scene.start("scene-start");
    });
  }
}

const Game: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("re-render");

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: size.width,
      height: size.height,
      parent: gameRef.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: speedDown },
          debug: true,
        },
      },
      scene: [StartGameScene, GameScene, GameOverScene],
    };
    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  });

  return <div ref={gameRef} id="gameCanvas"></div>;
};

export default Game;
