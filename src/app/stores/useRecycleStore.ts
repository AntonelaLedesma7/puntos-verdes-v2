import { create } from 'zustand';


type Material = {
  name: string;
  icon: React.ElementType | React.ComponentType<React.SVGProps<SVGSVGElement>>;
}; 
type Location = {
  name: string;
  address: string;
  hours: string;
} | null;

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
