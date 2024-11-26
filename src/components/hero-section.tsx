import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <main>
      <section id="hero">
        <article>
          <h1>Reciclaje</h1>
          <p>
            Hace que reciclar sea fácil y gratificante. Regístrate, recicla y
            gana puntos que luego puedes canjear por increíbles recompensas. “Es
            así de simple”
          </p>
          <a href="./pages/login.html">
            <button>Únete ahora</button>
          </a>
        </article>
        <div>
          <Image
            src="/assets/header.webp"
            alt="hero"
            width={400}
            height={400}
          />
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
