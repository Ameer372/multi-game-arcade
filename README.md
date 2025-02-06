# 🎮 Multi-Game Arcade

## 📝 Project Description

This project is a **multi-game arcade** built using **Vite, React, TypeScript, and Phaser**. It allows players to choose and play multiple games from a single page, providing a seamless gaming experience.

## 🚀 Technologies Used

- **Vite** - Fast build tool for frontend development
- **React** - Component-based UI library
- **TypeScript** - Strongly typed JavaScript
- **Phaser** - 2D game framework for interactive experiences

## 📂 Project Structure

```
📦 multi-game-arcade
├── 📂 public
|   ├── 📂 assets           # Images, sounds, etc.
|       ├── 📂 GameAssets
├── 📂 src
│   ├── 📂 components        # Reusable UI components
│   ├── 📂 games             # Individual game implementations
│   │   ├── 📂 game1         # First game
│   │   ├── 📂 game2         # Second game
│   │   └── ...
│   ├── 📂 hooks            # Custom React hooks
│   ├── 📂 context          # Global game state management
│   ├── 📂 utils            # Utility functions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # React entry point
│   ├── vite-env.d.ts       # TypeScript environment variables
│
├── 📜 index.html            # Main HTML template
├── 📜 tsconfig.json         # TypeScript configuration
├── 📜 vite.config.ts        # Vite configuration
├── 📜 package.json          # Dependencies and scripts
├── 📜 README.md             # Project documentation
└── 📜 .gitignore            # Files to ignore in version control
```

## 🎮 How to Play

1. Select a game from the **game selection menu**.
2. Play the game using the provided controls.
3. Restart or switch games anytime!

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ameer372/multi-game-arcade.git
cd multi-game-arcade
```

### 2️⃣ Install Dependencies

```bash
yarn install  # or npm install
```

### 3️⃣ Run the Project

```bash
yarn dev  # or npm run dev
```

### 4️⃣ Open in Browser

Go to: [http://localhost:5173](http://localhost:5173) (or as specified in your terminal).

## 🕹️ Adding New Games

To add a new game:

1. Create a new folder in `src/games/` (e.g., `src/games/game3`).
2. Implement the game using Phaser and TypeScript.
3. Import and register the game in the game selection menu.
4. 🎉 Enjoy your new game!

## 📌 Features

✅ Multiple playable games on one page  
✅ Smooth transitions between games  
✅ Interactive UI with React  
✅ High-performance using Vite  
✅ Strong type safety with TypeScript

## 🤝 Contributing

Feel free to submit issues and pull requests to enhance the arcade! 🚀

## 📜 License

This project is licensed under the **MIT License**.

---

🔹 Happy coding and have fun playing! 🎮🔥
