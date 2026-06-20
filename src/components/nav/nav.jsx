import { Link } from 'react-router-dom'
import styles from './nav.module.css'

function Nav() {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.logo}>Planner.</div>
        </div>

        <div className={styles.pages}>
            <Link to="/">Planner</Link>
            <Link to="/stats">Stats</Link>
            <Link to="/archive">Archive</Link>
        </div>
    </div>
  )
}

export default Nav