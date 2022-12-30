import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [movesNum, setMovesNum] = useState<number>(0);
  const [discsNum, setDiscsNum] = useState<number>(3);

  const [towers, setTowers] = useState([[1, 2, 3], [], []]);
  const [selectedTowerIndex, setSelectedTowerIndex] = useState<
    number | undefined
  >();

  function initTowers(num: number) {
    let towerArr = [];
    for (let i = 1; i <= num; i++) {
      towerArr.push(i);
    }
    setTowers([towerArr, [], []]);
  }

  function handleClickedTower(clickedTowerIndex: number) {
    // if the same tower has been clicked =>  return
    if (selectedTowerIndex === clickedTowerIndex) {
      setSelectedTowerIndex(undefined);
      return;
    }

    if (selectedTowerIndex !== undefined) {
      const selectedTower = towers[selectedTowerIndex];
      const clickedTower = towers[clickedTowerIndex];

      if (selectedTower[0] > (clickedTower[0] ?? 10)) {
        setSelectedTowerIndex(undefined);
        return;
      }

      const newTowers = [...towers];
      const poppedDisc = newTowers[selectedTowerIndex].shift()!;

      newTowers[clickedTowerIndex].unshift(poppedDisc);
      setTowers(newTowers);
      setMovesNum(movesNum + 1);
      // if (selectedTower[0] !== undefined) {
      //   setMovesNum(movesNum + 1);
      // }

      setSelectedTowerIndex(undefined);

      if (towers[2].length === discsNum) {
        setText("You win!");
      }
    } else {
      setSelectedTowerIndex(clickedTowerIndex);
    }
  }

  function handleChangeDiscs(num: number): void {
    if (num >= 3 && num <= 8) {
      setDiscsNum(num);
      initTowers(num);
    }
  }

  return (
    <div className="App">
      <div className="title-container">
        <h1 className="title">Tower of Hanoi</h1>
        <p className="description">
          Object of the game is to move all the disks over to Tower 3 (with your
          mouse by clicking). But you cannot place a larger disk onto a smaller
          disk.
        </p>
        <div className="discs-choose">
          <p>Number of discs: {discsNum}</p>{" "}
          <button onClick={() => handleChangeDiscs(discsNum + 1)}>up</button>
          <button onClick={() => handleChangeDiscs(discsNum - 1)}>down</button>
        </div>
      </div>
      <div className="info">
        <h3>{text}</h3>
        <p>{error}</p>
        <p className="moves">Moves: {movesNum}</p>
      </div>
      <div className="towers">
        {towers.map((discs, towerIndex) => (
          <div
            className="tower"
            key={towerIndex}
            onClick={() => handleClickedTower(towerIndex)}
          >
            <div
              className={`line ${
                selectedTowerIndex === towerIndex ? "selected" : ""
              }`}
            ></div>
            <div className="discs">
              {discs.map((discNumber, discIndex) => (
                <div
                  className="disc"
                  key={discIndex}
                  style={{ width: `${discNumber * 30 + 10}px` }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
