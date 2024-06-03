import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Manager from './components/Manager/Manager';
import Form from './components/Form/Form';
import { Router } from 'express';



function App() {



  return (
    <Router basename="/tg-webapp-react">
      <div className="App">
        <Routes>
          <Route index element={<Form />} />
          <Route path={'manager'} element={<Manager />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
