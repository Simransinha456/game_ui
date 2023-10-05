import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Board from "./Board";
import "../App.css"
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";

function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [winnerToastShown, setWinnerToastShown] = useState(false);

  const showWinnerToast = (winner) => {
    toast.success(`${winner} won the game!`, {
      position: "top-center",
      autoClose: 3000,
    });
    setWinnerToastShown(true);
  };

  useEffect(() => {
    if (result.state === "won" && !winnerToastShown) {
      showWinnerToast(result.winner);
    }
  }, [result, winnerToastShown]);

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if (!playersJoined) {
    return <div>Waiting for the other player to join...</div>;
  }

  return (
    <div className="gameContainer">
      <Board result={result} setResult={setResult} />
      
      <button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
        className="leavegame"
      >
        Leave Game
      </button>
      {result.state === "won" && (
        <div>
          {result.winner} Won The Game
        </div>
      )}
      {result.state === "tie" && <div>Game Tied</div>}
      <ToastContainer />
    </div>
  );
}

export default Game;
