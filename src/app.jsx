import { Routes, Route } from 'react-router-dom';
import Nav from './components/nav/nav.jsx';
import Planner from './pages/planner/planner.jsx';
import Stats from './pages/stats/stats.jsx';
import Archive from './pages/archive/archive.jsx';

import styles from './app.module.css'

function App() {
  return (
    <div className={styles.App}>
      <Nav />
      
      <Routes>
        <Route path="/" element={<Planner />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </div>
  )
}

export default App