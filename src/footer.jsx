import styles from '../styles/footer.module.css';

export default function Footer() {
    return (
      <footer className={styles.footer}>
      <ul className={styles.socialIcon}>
        <li className={styles.iconElem}>
          <a href="" className={styles.icon}>
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
        </li>
        <li className={styles.iconElem}>
          <a href="" className={styles.icon}>
            <ion-icon name="mail-outline"></ion-icon>
          </a>
        </li>
        <li className={styles.iconElem}>
          <a href="" className={styles.icon}>
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        </li>
      </ul>
      <ul className={styles.menuFooter}>
        <li className={styles.menuElem}>
          <a href="" className={styles.menuIcon}>Inicio</a>
        </li>
        <li className={styles.menuElem}>
          <a href="" className={styles.menuIcon}>Sobre nosotros</a>
        </li>
        <li className={styles.menuElem}>
          <a href="" className={styles.menuIcon}>Contacto</a>
        </li>
      </ul>
      <p className={styles.text}>Puntos verdes | IntegrarTEC @2024</p>
  </footer>
    );
}