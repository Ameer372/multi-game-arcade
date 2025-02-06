import Phaser from "phaser";
import { useEffect, useRef } from "react";

const size = {
  width: 500,
  height: 500,
};

const speedDown = 300;

const PuzzleGame: React.FC = () => {
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
      scene: [],
    };
    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  });

  return <div ref={gameRef} id="gameCanvas"></div>;
};

export default PuzzleGame;
