import { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Header from './Header';
import Playerlist from './Playerlist';
import TeamImage from './TeamImage';
import Subs from './Subs';
import EditButtons from './EditButtons'
import NavLayout from './NavLayout';





function App() {
  const [subs,setSubs]= useState([])
  

  function handleNewSubs(newSub){
    console.log("setting a new sub", newSub)
    setSubs([...subs, newSub])
  }



  useEffect(() => {
    console.log('subs reset')
    fetch('http://localhost:3000/substitutes')
      .then((response) => response.json())
      .then((data) => {
        setSubs(data);
      })
      .catch((error) => {
        console.error('Error fetching data from Subs:', error);
      });
  }, []);


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavLayout/>}>
        <Route index element={<Playerlist subs={subs} setSubs={setSubs} handleNewSubs={handleNewSubs} />}/>
        {/* <Route path="Subs" element={<Subs subs={subs} setSubs={setSubs}/>} /> */}
        <Route path="editButtons" element={<EditButtons handleNewSubs={handleNewSubs} />} />
      </Route>
    
    )
  )
  
  return (
    <div className='App'>
      <video src="public/production_id_4729190 (1080p).mp4" autoPlay loop muted/>
      <TeamImage/>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;