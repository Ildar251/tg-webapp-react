import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Manager from './components/Manager/Manager';
import Form from './components/Form/Form';



function App() {
  
  

  return (
    <div className="App">
        <Routes>
          <Route index element={<Manager />} />
          <Route path={'form'} element={<Form />} />
        </Routes>
    </div>
  );
}

export default App;
