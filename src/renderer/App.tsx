import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import './App.css';

const ScreenContents = () => {
  return (
    <div></div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScreenContents />} />
      </Routes>
    </Router>
  );
}
