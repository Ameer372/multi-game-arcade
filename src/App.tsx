import AppleGame from "./Games/AppleGame";
import PuzzleGame from "./Games/PuzzleGame";

const App = () => {
  return (
    <div className="flex row gap-10 p-10">
      <div>
        <AppleGame />
      </div>
      <div>
        <PuzzleGame />
      </div>
    </div>
  );
};

export default App;
