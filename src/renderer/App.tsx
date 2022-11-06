import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import './App.css';
import { Background } from './components/Background/Background';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Operations } from './screens/Operations/Operations';

export default function App() {
  return (
    <Router>
      <Background>
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Operations />} />
          </Routes>
        </main>
      </Background>
    </Router>
  );
}
