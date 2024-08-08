import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CustomCounter } from 'template-react-component-library-ben-sembira'

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
      <h1>Vite + React - Usage of custom created npm package</h1>
      <CustomCounter />
      {/* Types will fail: */}
      {/* <CustomCounter a="abc"/> */}
      {/* <CustomButton onClick={(a: number) => console.log(a)}/> */}
    </>
  )
}

export default App
