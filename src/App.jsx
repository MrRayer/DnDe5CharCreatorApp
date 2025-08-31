import { useContext, useState } from 'react'
import './App.css'
import Header from './components/header/header'
import MainStats from './components/content/SPECIAL/mainStats'
import CalculatedStats from './components/content/calculatedStats/calculatedStats'
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
import DieRoll from './components/popups/dieRoll/dieRoll'
import AbilitiesAndSpells from './components/content/abilitiesAndSpells/abilitiesAndSpells'
import ShowAbilityInfo from './components/popups/showAbilityInfo/showAbilityInfo'
import Choices from './components/content/choices/choices'
import ChoicePopup from './components/popups/choicePopup/choicePopup'
import ToolsAndLang from './components/content/toolsAndLang/toolsAndLang'
import AddTaL from './components/popups/addTaL/addTaL'
import RemoveTaL from './components/popups/removeTaL/removeTaL'
import BackgroundSelector from './components/popups/backgroundSelector/backgroundSelector'
import Skills from './components/content/skills/skills'
import SaveLoad from './components/content/saveLoad/saveLoad'

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
            {popupName === "dieRoll" && (<DieRoll/>)}
            {popupName === "showAbilityInfo" && (<ShowAbilityInfo/>)}
            {popupName === "choicePopup" && (<ChoicePopup/>)}
            {popupName === "addTaL" && (<AddTaL/>)}
            {popupName === "removeTaL" && (<RemoveTaL/>)}
            {popupName === "BackgroundSelector" && (<BackgroundSelector/>)}
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
      {contentFlag === "abilitiesAndSpells" && (
        <AbilitiesAndSpells/>
      )}
      {contentFlag === "choices" && (
        <Choices/>
      )}
      {contentFlag === "TaL" &&(
        <ToolsAndLang/>
      )}
      {contentFlag === "skills" &&(
        <Skills/>
      )}
      {contentFlag === "saveLoad" &&(
        <SaveLoad/>
      )}
    </>
  )
}

export default App
