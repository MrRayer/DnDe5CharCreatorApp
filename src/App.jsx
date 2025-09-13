import { useContext, useState } from 'react'
import './App.css'
import Header from './components/header/header'
import { GlobalsContext } from './context/globalsContext'

function App() {
  const { shaderFlag,setShaderFlag,popupName,contentFlag } = useContext(GlobalsContext);
  return (
    <>
      {shaderFlag === true && (
        <div className='shader'>
          <div className='close-shader-button' onClick={()=>{setShaderFlag(false)}}>▲</div>
          <div className='popup-content-container'>
            {popupName}
          </div>
        </div>
      )}
      <Header/>
      {contentFlag}
    </>
  )
}

export default App
