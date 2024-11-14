import styles from '../styles/navbar.module.css';

// Importamos los iconos SVG
import HomeIcon from '/public/icons/home.svg';
import MapIcon from '/public/icons/map.svg';
import RecycleIcon from '/public/icons/recycle.svg';
import CoinsIcon from '/public/icons/coins.svg';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="/dashboard" className={styles.navLink}>
            <HomeIcon className={styles.navIcon} />
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/rewards" className={styles.navLink}>
            <CoinsIcon className={styles.navIcon} />
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/map" className={styles.navLink}>
            <MapIcon className={styles.navIcon} />
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="/recycle" className={styles.navLink}>
            <RecycleIcon className={styles.navIcon} />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;