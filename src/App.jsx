import React, { useState } from 'react'
import './App.css'
import Mcq from './components/Mcq'
import HandleIcon from './components/HandleIcon'
import Msq from './components/Msq'
import Ntq from './components/Ntq'

function App() {
  let [selectedComponent, setSelectedComponent] = useState('mcq')

  let renderComponent = () => {

    if (selectedComponent === 'mcq') {
      return <Mcq />
    }
    else if (selectedComponent === 'msq') {
      return <Msq />
    }
    else if (selectedComponent === 'ntq') {
      return <Ntq />
    }

  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {
        renderComponent()
      }

      <HandleIcon selectedComponent={selectedComponent} setComponent={setSelectedComponent} />
    </div>
  )
}

export default App
