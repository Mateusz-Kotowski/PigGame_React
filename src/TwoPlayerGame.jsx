import React, { useState } from 'react';
import './style.css';

const TwoPlayerGame = () => {
  const [scores, setScores] = useState([0, 0]);
  const [currentScores, setCurrentScores] = useState([0, 0]);
  const [activePlayer, setActivePlayer] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [diceRoll, setDiceRoll] = useState(1);
  const [winner, setWinner] = useState(false);

  const handleNewGame = () => {
    setScores([0, 0]);
    setCurrentScores([0, 0]);
    setActivePlayer(0);
    setPlaying(true);
    setWinner(false);
  };

  const handleRollDice = () => {
    if (playing) {
      const dice = Math.trunc(Math.random() * 6) + 1;
      setDiceRoll(dice);

      const updatedCurrentScores = [...currentScores];
      updatedCurrentScores[activePlayer] += dice;

      if (dice === 1) {
        updatedCurrentScores[activePlayer] = 0;
        setActivePlayer(activePlayer === 0 ? 1 : 0);
      }

      setCurrentScores(updatedCurrentScores);
    }
  };

  const handleHold = () => {
    if (playing) {
      const updatedScores = [...scores];
      updatedScores[activePlayer] += currentScores[activePlayer];

      if (updatedScores[activePlayer] >= 100) {
        setPlaying(false);
        setWinner(true);
      } else {
        setActivePlayer(activePlayer === 0 ? 1 : 0);
      }

      setScores(updatedScores);
      setCurrentScores([0, 0]);
    }
  };

  return (
    <>
      <section
        className={`player player--${
          activePlayer === 0 ? `active` : 0
        } player--${activePlayer === 0 && winner === true ? `winner` : 0}`}
      >
        <h2 className="name">Player 1</h2>
        <p className="score" id="score--0">
          {scores[0]}
        </p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--0">
            {currentScores[0]}
          </p>
        </div>
      </section>
      <section
        className={`player player--${
          activePlayer === 0 ? 0 : 'active'
        } player--${activePlayer === 1 && winner === true ? `winner` : 0}`}
      >
        <h2 className="name">Player 2</h2>
        <p className="score" id="score--1">
          {scores[1]}
        </p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--1">
            {currentScores[1]}
          </p>
        </div>
      </section>

      <img src={`dice-${diceRoll}.png`} alt="Playing dice" className="dice" />
      <button className="btn btn--new" onClick={handleNewGame}>
        🔄 New game
      </button>
      <button
        className="btn btn--roll"
        onClick={handleRollDice}
        disabled={!playing}
      >
        🎲 Roll dice
      </button>
      <button
        className="btn btn--hold"
        onClick={handleHold}
        disabled={!playing}
      >
        📥 Hold
      </button>
    </>
  );
};

export default TwoPlayerGame;
