import React from 'react'
import { Route, Routes } from 'react-router'
import { Homepage } from './Homepage'
import InterviewPage from './InterviewPage'
import { Anylasis } from './Anylasis'

export const Allroutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Homepage/>}></Route>
            <Route path="/interview" element={<InterviewPage/>}></Route>
            <Route path='/anylasis' element={<Anylasis/>}></Route>
        </Routes>
    </div>
  )
}
