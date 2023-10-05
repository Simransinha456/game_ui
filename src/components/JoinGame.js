import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";
import "../App.css"
function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <div className="h4">
            <h4>Create Game</h4>
          </div>
          <input
            placeholder="Username"
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <button onClick={createChannel}> Join/Start Game</button>
        </div>

      )}
      <div className='submit-tag'>
        <p>Project Created By: Simran Sinha</p>
        <a href='https://github.com/Simransinha456' target='_blank' rel="noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/3291/3291695.png" width="32" height="32" alt="Github"></img>
        </a>
        <a href='https://www.linkedin.com/in/simran-sinha-54b4241b7/' target='_blank' rel="noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" width="32" height="32" alt="LinkedIn"></img>
        </a>
      </div>
    </>
  );
}

export default JoinGame;
