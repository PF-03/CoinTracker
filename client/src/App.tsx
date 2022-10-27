import './App.css';
import SharedLayout from './components/SharedLayout';
import { Login } from './components/login/Login';
import { Routes, Route } from 'react-router-dom';
import { DemoWelcome } from './components/demoComponent/DemoWelcome';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route path='' element={<DemoWelcome />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
