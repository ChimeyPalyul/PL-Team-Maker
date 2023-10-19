import React, { useEffect, useState } from 'react';

function Subs({subs}) {
  const [show, setShow] = useState(false);

  function showSubs() {
    setShow(!show);
  }

  
  // useEffect(() => {
  //   fetch('http://localhost:3000/substitutes')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setSubs(data);
  //       // console.log(`sub list:`)
  //       // data.map(dat => console.log(dat))
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data from Subs:', error);
  //     });
  // }, []);

  return (
    <div className="subs">
      <button onClick={showSubs}>
        {show ? "Hide Subs" : "Show Subs"}
      </button>
      {show && (
        <ul>
          {subs
            .map((sub) => (
              <li key={sub.id}>
                {sub.name} - {sub.position}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Subs;