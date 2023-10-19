import React, { useEffect, useState } from "react";

export default function PlayerCard({setSelectedPosition, selectedPosition, name, position, handlePlayerClick, players, setPlayers, subs, setSubs, handleNewSubs }) {
  const [displayInfo, setDisplayInfo] = useState(false);
  const [selectedSubstitute, setSelectedSubstitute] = useState('');
  const handleSub = () => {
    if (selectedSubstitute && selectedPosition) {
      // Find the substitute in the 'subs' array that matches the selected position
      const substituteToBringIn = subs.find((sub) => sub.position === selectedPosition);
      const subbedPlayer = subs.find(player => selectedSubstitute === player['name'] && selectedPosition === player['position'])
      console.log('subplayer')
      console.log(subbedPlayer)
      // Create a new array with the substitution
      const updatedPlayers = players.map((player) =>
        player.name === name ? {
          id: subbedPlayer.id,
          name: subbedPlayer.name,
          position: subbedPlayer.position
        } : player
        );

       const updatedSubs = subs.filter((sub)=> sub !== subbedPlayer)
       console.log(updatedSubs)
      setPlayers(updatedPlayers);
      setSubs(prevSubs => [...updatedSubs]);


      handleNewSubs({name, position})
      setSelectedSubstitute(null);
    }
  };
// function switchPlayerSub(){
//   fetch("http://localhost:3000/substitutes", {
//         method:"POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newSubDetails)
//     })
//     .then((response)=> response.json())
//     .then((newSub) => handleNewSubs(newSub))
//     .catch((error) => {
//         console.log("Error adding a new substitute", error)
//     })
//   };
  // }
  // fetch("http://localhost:3000/chelseaPlayers", {
  //   method:"DELETE"
  // })

  function displaySubs() {
    if (selectedPosition === position) {
      return (
        <div>
            <select value={selectedSubstitute} onChange={(e) => setSelectedSubstitute(e.target.value)}>
            <option value="">Select a substitute</option>
            {subs
                .filter((sub) => sub.position === selectedPosition && sub.name !== name)
                .map((sub) => (
                <option key={sub.id} value={sub.name}>
                    {sub.name}
                </option>
                ))}
            </select>
            <button onClick={handleSub}> Replace Player </button>
        </div>
      );
    }
  }

  function toggleInfo() {
    setDisplayInfo(!displayInfo);
    handlePlayerClick({ name, position });
    setSelectedPosition(position)
  }

  

  return (
    <div>
        <li>
        <div className="player-cards" onClick={toggleInfo}>
            <button className="show-available-subs">{name}-{position}</button>
        </div>
        {displayInfo && displaySubs()}
        </li>
    </div>
  );
}