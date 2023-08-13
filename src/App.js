import React from 'react'
import Data from "./Data/data.json"
import HkeyChart from './Component/HkeyChart'
import "./App.css"

const App = () => {
  return (
    <div>
      <h1 className='heading'>Organization Hierarchy Chart</h1>
      {Data.map((rootNode) => (
        <HkeyChart key={rootNode.id} node={rootNode} />
      ))}
    </div>
  )
}

export default App;