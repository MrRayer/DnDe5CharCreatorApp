import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/header'
import MainStats from './components/content/SPECIAL/mainStats'
import CalculatedStats from './components/content/calculatedStats/calculatedStats'
import AppProviders from './context/appProviders'
import RaceContainer from './components/content/race/raceContainer'
import { GlobalsContext } from './context/globalsContext'
import RaceSelector from './components/popups/raceSelector/raceSelector'
import SubraceSelector from './components/popups/subraceSelector/subraceSelector'
import ClassSelector from './components/popups/classSelector/classSelector'
import GlobalSelector from './components/popups/globalSelector/globalSelector'
import Resources from './components/content/resources/resources'
import Inventory from './components/content/inventory/inventory'
import Equipment from './components/content/equipment/equipment'
import AddInventoryItem from './components/popups/addInventoryItem/addInventoryItem'

function App() {
  const { shaderFlag,setShaderFlag,popupName,contentFlag } = useContext(GlobalsContext);
  return (
    <>
      {shaderFlag === true && (
        <div className='shader'>
          <div className='close-shader-button' onClick={()=>{setShaderFlag(false)}}>▲</div>
          <div className='popup-content-container'>
            {popupName === "RaceSelector" && (<RaceSelector/>)}
            {popupName === "SubRace" && (<SubraceSelector/>)}
            {popupName === "ClassSelector" && (<ClassSelector/>)}
            {popupName === "GlobalSelector" && (<GlobalSelector/>)}
            {popupName === "addInventoryItem" && (<AddInventoryItem/>)}
          </div>
        </div>
      )}
      <Header/>
      {contentFlag === "mainMenu" && (
        <>
          <RaceContainer/>
          <MainStats/>
          <CalculatedStats/>
          <Resources/>
        </>
      )}
      {contentFlag === "inventory" && (
        <Inventory/>
      )}
      {contentFlag === "equipment" && (
        <Equipment/>
      )}
    </>
  )
}

export default App
