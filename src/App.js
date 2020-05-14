import React from 'react';

import './App.css';
import 'semantic-ui-css/semantic.min.css'

import Chat from "./components/Chat"

function App() {
  return (
    <div className="App">
      <Chat user="Pavel"></Chat>
    </div >
  );
}

export default App;
