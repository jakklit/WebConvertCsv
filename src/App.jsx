import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ConvertFile from './pages/ConvertFile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConvertFile />} />
      </Routes>
    </Router>
  );

}

export default App;
