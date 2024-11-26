import MetalIcon from '/public/icons/metal.svg';
import GlassIcon from '/public/icons/glass.svg';
import PaperIcon from '/public/icons/paper.svg';
import PlasticIcon from '/public/icons/plastic.svg';
import Navbar from '@/components/navbar';

export default function ManualDeReciclaje(): JSX.Element {
  return (
    <div className="container p-6 mx-auto text-white mb-9">
      <h1 className="mb-4 text-3xl font-bold text-center">Manual de Reciclaje</h1>
      <div className="space-y-6">
        {/* Sección 1: Introducción */}
        <section className="p-4 bg-[--color-secundary] rounded-lg shadow-md">
          <h2 className="flex items-center mb-2 text-xl font-semibold">
            ¿Por qué es importante reciclar?
          </h2>
          <p className="text-white">
            Reciclar es crucial para reducir la contaminación y conservar los recursos naturales. A través del reciclaje, podemos disminuir la cantidad de basura que va a los vertederos y promover un ambiente más limpio y saludable.
          </p>
        </section>

        {/* Sección 2: Cómo empezar a reciclar */}
        <section className="p-4 bg-[--color-secundary] rounded-lg shadow-md">
          <h2 className="flex items-center mb-2 text-xl font-semibold">
            Cómo empezar a reciclar
          </h2>
          <ul className="space-y-2 text-white list-disc list-inside">
            <li>Los materiales reciclables comunes incluyen papel, cartón, vidrio, plástico y metal.</li>
            <li>Lava y limpia los materiales reciclables antes de desecharlos.</li>
            <li>Separa los materiales en categorías: reciclables y no reciclables.</li>
            <li>Identifica los puntos de reciclaje cercanos en nuestro mapa interactivo.</li>
          </ul>
        </section>

        {/* Sección 3: Materiales reciclables y no reciclables */}
        <section className="p-4 bg-[--color-secundary] rounded-lg shadow-md">
          <h2 className="flex items-center mb-2 text-xl font-semibold">
            ¿Qué materiales se pueden reciclar?
          </h2>
          <p className="text-white">
            Aquí tienes una lista de materiales reciclables:
          </p>
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
            {/* Materiales reciclables */}
            <div>
              <h3 className="mb-4 font-semibold text-[--color-primary]">Materiales reciclables:</h3>
              <ul className="space-y-5 list-disc list-inside">
                <li className="flex items-center">
                  <PaperIcon className="w-6 h-6 mr-2" />
                  Papel y cartón
                </li>
                <li className="flex items-center">
                  <PlasticIcon className="w-6 h-6 mr-2" />
                  Plásticos (botellas, envases)
                </li>
                <li className="flex items-center">
                  <GlassIcon className="w-6 h-6 mr-2" />
                  Vidrio (botellas, frascos)
                </li>
                <li className="flex items-center">
                  <MetalIcon className="w-6 h-6 mr-2" />
                  Metales (latas, aluminio)
                </li>
              </ul>
            </div>
          </div>
        </section>
        <Navbar />
      </div>
    </div>
  );
}