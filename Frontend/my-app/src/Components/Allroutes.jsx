import React from 'react'
import { Route, Routes } from 'react-router'
import { Homepage } from './Homepage'
import InterviewPage from './InterviewPage'

export const Allroutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Homepage/>}></Route>
            <Route path="/interview" element={<InterviewPage/>}></Route>
            <Route></Route>
        </Routes>
    </div>
  )
}
