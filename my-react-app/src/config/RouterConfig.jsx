import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Mainpage from '../components/Mainpage'
import Home from '../pages/Home'
import Add from '../components/Add'
import Sub from '../components/Sub'
import CurrentStok from '../components/CurrentStok'
import Movements from '../components/Movements'
import Login from '../components/Login'
import DataScience from '../components/DataScience'

function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route path='/'  element={<Home></Home>} ></Route>
        <Route path='/add' element={<Add></Add>} ></Route>
        <Route path='/sub' element={<Sub></Sub>} ></Route>
        <Route path='/curstok' element={<CurrentStok></CurrentStok>}></Route>
        <Route path='/mov' element={<Movements></Movements>} ></Route>
        <Route path='/login'element={<Login></Login>}></Route>
        <Route path='/dashboard'element={<DataScience></DataScience>}></Route>




      </Routes>
    </div>
  )
}

export default RouterConfig
