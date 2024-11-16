'use client'

import Image from "next/image";
import styles from '@/styles/hero-section.module.css';
import Footer from "@/components/footer";
import Navbar from "@/components/navbar-landing";

export default function Home() {

  return (
    <>
      <Navbar/>
      <main className={styles.main}>
        <section className={styles.hero}>
          <article className={styles.article}>
            <h1 className={styles.h1}>Reciclaje</h1>
              <p>Hace que reciclar sea fácil y gratificante. Regístrate, recicla y gana puntos que luego puedes canjear por increíbles recompensas. “Es así de simple”</p>
              <a href="./auth/login"><button className="hover:bg-[--color-hover]">Únete ahora</button></a>
          </article>
          <div>
            <Image src="/assets/header.webp" alt="hero" width={700} height={500} className="hidden md:block"/>      
          </div>
        </section>

        {/* De qué trata la app */}
        <section id="app-overview" className={styles.appOverview}>
          <article>
            <h2 className={styles.heading}>De qué trata la app</h2>
            <p className={styles.paragraph}>
              Nuestra aplicación de reciclaje está diseñada para hacer que el reciclaje sea más fácil, 
              conveniente y gratificante para todos. Registra tus materiales reciclados, gana puntos y canjea 
              recompensas exclusivas, todo desde la palma de tu mano.
            </p>
          </article>
        </section>

        {/* Beneficios del reciclaje */}
        <section className={styles.recyclingBenefits}>
          <div>
            <Image 
              src="/assets/benefits.webp" // Ruta para la imagen en la carpeta `public/assets`
              alt="benefits"
              width={240} // Puedes ajustar el tamaño
              height={240}
              className={styles.img}
            />
          </div>
          <article>
            <h2 className={styles.heading}>Beneficios del Reciclaje</h2>
            <p className={styles.paragraph}>
              El reciclaje es una forma poderosa de proteger nuestro planeta y construir un futuro más sostenible. Al reciclar, contribuyes a la conservación de recursos naturales, la reducción de la contaminación y la preservación del medio ambiente para las generaciones futuras.
            </p>
          </article>
        </section>

        {/* Recompensas */}
        <section id="rewards" className={styles.rewards}>
          <article>
            <h2 className={styles.heading}>Recompensas</h2>
            <p className={styles.paragraph}>
              Desde cupones de descuentos hasta productos exclusivos, nuestras recompensas son una forma de agradecer 
              a nuestros usuarios por su compromiso con el reciclaje. ¡Descubre las recompensas que puedes ganar y únete 
              al movimiento de reciclaje hoy mismo!
            </p>
          </article>
        </section>        

        {/* Cómo se ganan los puntos */}
        <section id="earning-points" className={styles.earningPoints}>
          <article>
            <h2 className={styles.heading}>Cómo se ganan los puntos</h2>
            <p className={styles.paragraph}>
              Ganar puntos es fácil con nuestra aplicación. Simplemente regístrate, registra tus materiales reciclados, participa en eventos 
              de limpieza y más. Cuantos más puntos ganes, más recompensas podrás desbloquear. ¡Empieza a ganar puntos ahora!
            </p>
          </article>
        </section>

        {/*Zonas de reciclaje*/}
        <section id="recyclingPoints" className={styles.recyclingPoints}>
            <article>
                <h2 className={styles.heading}>Puntos de Reciclaje</h2>
                <p className={styles.paragraph}>Encuentra puntos de reciclaje cercanos a ti y haz tu parte para proteger el medio ambiente. Nuestra aplicación te muestra los puntos de reciclaje disponibles en tu área, junto con detalles sobre qué materiales se aceptan y los horarios de funcionamiento</p>        
            </article>
            <div>
                <Image src="/assets/points.webp" alt="recycling-points" width={400} height={400}/>   
            </div>
        </section>
        {/*Colaboraciones y alianzas*/}
        <section id="partnerships" className={styles.partnerships}>
            <article>
                <h2 className={styles.heading}>Colaboraciones y Alianzas</h2>
                <p className={styles.paragraph}>A través de estas alianzas, podemos ofrecer a nuestros usuarios descuentos especiales, eventos exclusivos y más. Únete a nosotros en nuestra misión de hacer del mundo un lugar más limpio y verde</p>                
            </article>
            <div>
                <a href="#"><button className="hover:bg-[--color-hover]">Únete a la misión</button></a>                
            </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}
