// import { Provider } from 'react-redux';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import { store } from 'store/store';
import './App.scss';
import { Background } from './components/Background/Background';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Operations } from './screens/Operations/Operations';

export default function App() {
  return (
    // <Provider store={store}>
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
    // </Provider>
  );
}
