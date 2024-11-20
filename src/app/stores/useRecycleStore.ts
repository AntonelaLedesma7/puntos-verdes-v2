import { create } from 'zustand';

// Definir los tipos para los materiales y la ubicación
type Material = { name: string; icon: JSX.Element }; // El tipo de Material ahora es un objeto
type Location = { name: string; address: string } | null;

interface RecycleStore {
  selectedMaterials: Material[];
  selectedLocation: Location;
  setSelectedMaterials: (materials: Material[]) => void;
  setSelectedLocation: (location: Location) => void;
}

// Crear el store con los tipos definidos
const useRecycleStore = create<RecycleStore>((set) => ({
  selectedMaterials: [],
  selectedLocation: null,
  setSelectedMaterials: (materials) => set({ selectedMaterials: materials }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));

export default useRecycleStore;
