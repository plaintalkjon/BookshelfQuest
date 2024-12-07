import { Home } from './pages';
import { Navbar } from './components';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
