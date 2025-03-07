import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/header'
import MainStats from './components/content/SPECIAL/mainStats'
import CalculatedStats from './components/content/calculatedStats/calculatedStats'
import AppProviders from './context/appProviders'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppProviders>
      <Header/>
      <MainStats/>
      <CalculatedStats/>
    </AppProviders>
  )
}

export default App
