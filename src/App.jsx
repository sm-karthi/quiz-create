
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Mcq from './components/Mcq'
import HandleIcon from './components/HandleIcon'
import Msq from './components/Msq';
import Ntq from './components/Ntq';

function App() {


  return (
    <div className='flex min-h-screen bg-gray-50'>



      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Mcq/>}/>

          <Route path='/question-msq' element={<Msq/>}/>

          <Route path='/question-ntq' element={<Ntq/>}/>

        </Routes>


        <HandleIcon/>

      </BrowserRouter>

      
      

    </div>
  )
}

export default App
