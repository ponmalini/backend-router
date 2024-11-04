// import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Formdisplay from './components/Formdisplay';
import Update from './components/Update';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form/>}></Route>
          <Route path="/display" element={<Formdisplay/>}></Route>
          <Route path="/getbyid/:id" element={<Update/>}></Route>
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;