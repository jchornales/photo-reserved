import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  );
}

export default App;
