import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DeployFunction from './pages/DeployFunction.jsx';
import FunctionList from './pages/FunctionList.jsx';
import RunFunction from './pages/RunFunction.jsx';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Deploy</Link>
        <Link to="/list" style={{ marginRight: '1rem' }}>List</Link>
        <Link to="/run">Run</Link>
      </nav>
      <Routes>
        <Route path="/" element={<DeployFunction />} />
        <Route path="/list" element={<FunctionList />} />
        <Route path="/run" element={<RunFunction />} />
      </Routes>
    </Router>
  );
}

export default App;
