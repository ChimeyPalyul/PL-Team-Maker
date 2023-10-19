import React, { useEffect, useState } from 'react';
import Subs from './Subs';
import PlayerCard from './PlayerCard';
import EditButtons from './EditButtons';


function PlayerList({subs, setSubs, handleNewSubs}) {
  const [players, setPlayers] = useState([]);
  const[selectedPosition, setSelectedPosition]= useState(null)


  useEffect(() => {
    
    fetch("http://localhost:3000/chelseaPlayers")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/substitutes')
      .then((response) => response.json())
      .then((data) => {
        setSubs(data);
      })
      .catch((error) => {
        console.error('Error fetching data from Subs:', error);
      });
  }, []);

  const handlePlayerClick = (player) => {
    setSelectedPosition(player.position)
  }

  const playerdeets= players.map((player)=> (
    <PlayerCard
    selectedPosition={selectedPosition}
    setSelectedPosition={setSelectedPosition}
    key={player.id}
    name={player.name}
    position={player.position}
    handlePlayerClick={handlePlayerClick}
    players={players}
    subs={subs}
    setPlayers={setPlayers}
    setSubs={setSubs}
    handleNewSubs={handleNewSubs} 
    />
  ))

  return (
    <div className="playerlist">
      <h2 className="chelseaPlayers">Chelsea Players List</h2>
      <ul className="cards">
        {playerdeets}
      </ul>
      <Subs subs={subs} setSubs={setSubs}/>
      {subs.length > 0 && <EditButtons setSubs={setSubs} handleNewSubs={handleNewSubs} />}
    </div>
  );
  
}


export default PlayerList;