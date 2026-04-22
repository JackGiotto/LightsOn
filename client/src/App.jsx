import React from 'react';
import './App.css';
import AppRouter from './router/AppRouter.jsx';

function App() {

  return (
    <>
    <svg width={332} height={455} fill="none" className="back1">
      <path
        d="M129.079 210.5C120.239 62.1 39.343 8.333 0 0h331.487v455s-191.359-59-202.408-244.5z"
        fill="#F4C50B"
      />
    </svg>

    <svg width="925" height="285" viewBox="0 0 925 285" fill="none" xmlns="http://www.w3.org/2000/svg" className='back2'>
      <path d="M385 24.3281C697.976 114.212 733.5 231.5 925 289.328L71.9996 289.328C-266 289.328 -266 56.3281 -266 56.3281C-266 56.3281 143 -45.172 385 24.3281Z" fill="#F4C50B"/>
    </svg>

    <AppRouter />
    </>
  )
}

export default App

