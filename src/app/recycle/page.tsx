'use client'

import { useState } from 'react';
import styles from '@/styles/recycle-page.module.css';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import useRecycleStore from '@/app/stores/useRecycleStore';
import ChatComponent from './chatbot/chatbot';
import Chaticon from '@/icons/chat.svg';

// Iconos
import MetalIcon from '@/icons/metal.svg';
import GlassIcon from '@/icons/glass.svg';
import PaperIcon from '@/icons/paper.svg';
import BoxIcon from '@/icons/box.svg';
import PlasticIcon from '@/icons/plastic.svg';

type Material = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const materialsList: Material[] = [
  { name: 'Metales', icon: MetalIcon },
  { name: 'Vidrio', icon: GlassIcon },
  { name: 'Papel', icon: PaperIcon },
  { name: 'Cartón', icon: BoxIcon },
  { name: 'Plástico', icon: PlasticIcon },
];

export default function Recycle() {
  const { selectedMaterials, setSelectedMaterials } = useRecycleStore();
  const [isChatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const handleSelectMaterial = (material: Material) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(
        selectedMaterials.filter((item) => item !== material)
      );
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  return (
    <div className="grid gap-6 text-center ">
      <div>
        <h2 className="mb-8 text-3xl font-bold">Reciclar</h2>
        <p>Selecciona los materiales que vas a reciclar</p>
      </div>
      <div className={styles.materialsList}>
        {materialsList.map((material, index) => {
          const IconComponent = material.icon;
          return (
            <button
              key={index}
              className={`${styles.materialButton} ${
                selectedMaterials.includes(material) ? styles.selected : ''
              }`}
              onClick={() => handleSelectMaterial(material)}
            >
              <div className={styles.materialIcon}>
                <IconComponent />
              </div>
              <p className={styles.materialName}>{material.name}</p>
            </button>
          );
        })}
      </div>
      <div>
        <Link
          href="recycle/locations"
          className={buttonVariants({
            variant: 'default',
            size: 'lg',
            className: 'font-bold',
          })}
        >
          Siguiente
        </Link>
      </div>
      <div>
        <button className={styles.floatingIcon} onClick={toggleChat}>
          <Chaticon className={styles.chatIcon} />
        </button>
        {isChatOpen && <ChatComponent onClose={toggleChat} />}
        <Navbar />
      </div>
    </div>
  );
}
