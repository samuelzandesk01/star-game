import React, { useState } from "react";

// STAR MATCH - Starting Template

const MyStar = (props) => {
  return utils
    .range(1, props.count)
    .map((starId) => <div key={starId} className="star" />);
};

const MyBtn = (props) => {
  return (
    <button
      className="number"
      style={{ backgroundColor: colors[props.status] }}
      onClick={() => props.onClick(props.myNum, props.status)}
    >
      {props.myNum}
    </button>
  );
};

const PlayGameAgain = (props) => {
  return (
    <div className="game-done">
      <button className="" onClick={props.onClick}>
        Play Again
      </button>
    </div>
  );
};

const myApp = (props) => {
  const [stars, setCount] = useState(utils.random(1, 9));
  const [availableNums, setAvailNum] = useState(utils.range(1, 9));
  const [candidateNums, setCandidate] = useState([]);

  const candidateAreWrong = utils.sum(candidateNums) > stars;
  const gameIsDone = availableNums.lenght === 0;

  const resetGame = () => {
    setCount(utils.random(1, 9));
    setAvailNum(utils.range(1, 9));
    setCandidate([]);
  };

  const numberStatus = (num) => {
    if (!availableNums.includes(num)) {
      return "used";
    }
    if (candidateNums.includes(num)) {
      return candidateAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const myClick = (number, currentStatus) => {
    if (currentStatus === "used") {
      return;
    }

    const newCandidateNum =
      currentStatus === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);

    if (utils.sum(newCandidateNum) !== stars) {
      setCandidate(newCandidateNum);
    } else {
      const newAvailadateNum = availableNums.filter(
        (n) => !newCandidateNum.includes(n)
      );
      setCount(utils.randomSumIn(newAvailadateNum, 9));
      setAvailNum(newAvailadateNum);
      setCandidate([]);
    }
  };

  return (
    <div>
      <div>
        <p>Pick 1 or more numbers that sum to the number of star</p>
      </div>

      <div className="body">
        <div className="left">
          {gameIsDone ? (
            <PlayGameAgain onClick={resetGame} gameStatuz="Play Again" />
          ) : (
            <MyStar count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((numId) => (
            <MyBtn
              key={numId}
              status={numberStatus(numId)}
              onClick={myClick}
              myNum={numId}
            />
          ))}
        </div>
      </div>
      <p className="timer">Time Left: 10</p>
    </div>
  );
};

// Color Theme
const colors = {
  available: "lightgray",
  used: "lightgreen",
  wrong: "lightcoral",
  candidate: "deepskyblue"
};

// Math science
const utils = {
  // Sum an array
  sum: (arr) => arr.reduce((acc, curr, com) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  }
};

export default myApp;
