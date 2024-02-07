import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Grover from './pages/Grover'
import Trader from './pages/Trader'
import Transport from './pages/Transport'

function App() {

  const [choice, setChoice] = useState('log')
  const [role, renderRole] = useState('')

  return (
    <div className="App">
      {
        choice === 'log' &&
          <Login setChoice={setChoice} renderRole={renderRole} /> 
      }

      { choice === 'reg' &&
        <Register setChoice={setChoice} />
      }

      {
        role === 'Grover' && <Grover />
      }

      {
        role === 'Trader' && <Trader />
      }

      {
        role === 'Transporter' && <Transport />
      }
    </div>
  );
}

export default App;
