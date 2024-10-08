import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { CustomCounter } from '../lib/CustomCounter'
import './App.css'

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React - React component library package preview</h1>
      <CustomCounter />
    </>
  )
}

export default App
