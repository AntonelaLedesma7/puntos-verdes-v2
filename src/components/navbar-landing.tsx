import navbar from '@/styles/navbar-landing.module.css';
import Image from "next/image";
import Link from 'next/link';
import React, { useState } from 'react';

export default function NavbarLanding() {
    const [, setIsOpen] = useState(false);

    // Funciones para abrir y cerrar el menú
    const openNav = () => {
        setIsOpen(true);
        const menuElement = document.getElementById("mobile-menu");
        if (menuElement) {
          menuElement.style.width = "100%";
        }
    };
      
    const closeNav = () => {
        setIsOpen(false);
        const menuElement = document.getElementById("mobile-menu");
        if (menuElement) {
          menuElement.style.width = "0%";
        }
    };
      
    return (
        <header className={navbar.header}>
        <div className={navbar.logo}>
          <Image src="/assets/logo.webp" alt="hero" width={200} height={100} />
        </div>
        <nav>
          <ul className={navbar.navLinks}>
            <li><Link href="/">Inicio</Link></li>
            <li><a href="./pages/aboutUs.html">Sobre nosotros</a></li>
            <li><a href="/auth/login">Iniciar Sesion</a></li>
          </ul>
        </nav>
        <a className={navbar.btn} href="/auth/register">
          <button>Registrarse</button>
        </a>

        <a onClick={openNav} className={navbar.menu} href="#">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
        </a>

        <div id="mobile-menu" className={navbar.overlay}>
          <a onClick={closeNav} href="" className={navbar.close}>
            &times;
          </a>
          <div className={navbar.overlayContent}>
            <a href="#">Inicio</a>
            <a href="./pages/aboutUs.html">Sobre nosotros</a>
            <a href="./auth/login">Iniciar Sesion</a>
            <a href="/auth/register.html">Registrarse</a>
          </div>
        </div>
      </header>
    )
}