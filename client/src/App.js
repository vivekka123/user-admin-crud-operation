
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
