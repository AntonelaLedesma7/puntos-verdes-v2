import { create } from 'zustand';

interface RecycleStore {
  selectedMaterials: string[];
  selectedLocation: string | null;

  setSelectedMaterials: (materials: string[]) => void;
  setSelectedLocation: (location: string | null) => void;
}

const useRecycleStore = create<RecycleStore>((set) => ({
  selectedMaterials: [],
  selectedLocation: null,
  setSelectedMaterials: (materials) => set({ selectedMaterials: materials }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));

export default useRecycleStore;
