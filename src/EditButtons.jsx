import React, { useState } from "react";

function EditButtons({handleNewSubs}) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [height, setHeight] = useState(null)
  const [pace, setPace] = useState(null)
  const[show,setShow] = useState(false)

  function showEdit(){
    setShow(!show)
  }

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePosition = (e) => {
    setPosition(e.target.value);
  };
  const handleHeight = (e) => {
    setHeight(e.target.value)
  }
  const handlePace = (e) => {
    setPace(e.target.value)
  }
  const handleUpdate = (e) => {
    e.preventDefault()
    const newSubDetails ={
        name: name,
        position: position,
        height: height,
        pace:pace
    }
    fetch("http://localhost:3000/substitutes", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSubDetails)
    })
    .then((response)=> response.json())
    .then((newSub) => handleNewSubs(newSub))
    .catch((error) => {
        console.log("Error adding a new substitute", error)
    })
  };

  return (
    <div className="edit">
      <button onClick={showEdit}>
        {show ? "Hide " : "Add Player"}
      </button>
      {show && (
      <form onSubmit={handleUpdate}>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={handleName} />
        </label>
      </div>
      <div>
        <label>
          Position:
          <input type="text" value={position} onChange={handlePosition} />
        </label>
      </div>
      <div>
        <label>
          Pace:
          <input type="text" />
        </label>
        <div>
        <label>
          Height:
          <input type="text" />
        </label>
      </div>
      </div>
      <button type="submit" onClick={handleUpdate}>Add New Player</button>
      </form>
      )}
    </div>
  );
}

export default EditButtons;
