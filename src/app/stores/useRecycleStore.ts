import { create } from 'zustand';

type LocationType = {
  value: string;
  name: string;
  address: string;
  hours: string;
  imageUrl: string;
};

interface RecycleStore {
  selectedMaterials: string[];
  selectedLocation: LocationType | null;

  setSelectedMaterials: (materials: string[]) => void;
  setSelectedLocation: (location: LocationType | null) => void;
}

const useRecycleStore = create<RecycleStore>((set) => ({
  selectedMaterials: [],
  selectedLocation: null,
  setSelectedMaterials: (materials) => set({ selectedMaterials: materials }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));

export default useRecycleStore;
