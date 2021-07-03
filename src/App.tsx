import React from 'react';
import './App.css';
import { contentProportion } from './components/common';
import Sidebar from './components/Sidebar';

// Change this here or on the `public` folder?
// How about the favicon?
document.title = 'POSApp';

export default function App() {
  return (
    <div
      style={{
        // padding: 0,
        // margin: 0,
        // listStyle: 'none',
        display: 'flex', // Important? Signifies use of flexbox?

        // flex: 1,
        // flexDirection: 'column',
        height: '100vh',
      }}
    >
      <title>POSApp</title>
      <Sidebar />
      <div
        style={{
          flex: `${100 - contentProportion.sidebar}%`,
          // backgroundColor: 'lightyellow',
        }}
      >
        {/* <p>{sectionSizes.sidebar}</p> */}
      </div>
    </div>
  );
}
