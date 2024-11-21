import { CookieValueTypes } from 'cookies-next';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Reward } from '@/types/interface-reward';

interface PointsResponse {
  points: number;
}

interface RewardStore {
  userId: CookieValueTypes | Promise<CookieValueTypes>;
  userPoints: number | null;
  selectedReward: Reward | null;
  redeemedRewards: Reward[];
  getPoints: () => Promise<void>;
  setPoints: (points: number) => Promise<PointsResponse | null>;
  setUserId: (userId: CookieValueTypes | Promise<CookieValueTypes>) => void;
  setSelectedReward: (reward: Reward | null) => void;
  updateAfterRedemption: (newPoints: number, newReward: Reward) => void;
}

const useRewardStore = create<RewardStore>()(
  persist(
    (set, get) => ({
      getPoints: async () => {
        const { userId } = get();
        if (!userId) {
          return;
        }
        const response = await fetch(`/api/points/${userId}`);
        console.log('Response points', response);
        const data = await response.json();
        set({ userPoints: data });
      },
      setPoints: async (points: number) => {
        const { userId } = get();
        if (!userId) {
          return;
        }
        try {
          const response = await fetch(`/api/points/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ points }),
          });
          const data = await response.json();
          set({ userPoints: data });
          return data;
        } catch (error) {
          console.log('Error al actualizar los puntos', error);
          return null;
        }
      },
      setUserId: (userId) => set({ userId }),
      userId: undefined,
      userPoints: null,
      selectedReward: null,
      redeemedRewards: [],
      setSelectedReward: (reward: Reward | null) =>
        set({ selectedReward: reward }),
      updateAfterRedemption: (newPoints: number, newReward: Reward) =>
        set((state) => ({
          userPoints: newPoints,
          redeemedRewards: [...state.redeemedRewards, newReward],
        })),
    }),
    {
      name: 'reward-storage', // Nombre del almacenamiento persistente
      storage: {
        getItem: (name: string) => {
          const item = localStorage.getItem(name);
          return item
            ? Promise.resolve(JSON.parse(item))
            : Promise.resolve(null);
        },
        setItem: (name: string, value: unknown) => {
          // Aseguramos que `value` sea serializable
          localStorage.setItem(name, JSON.stringify(value));
          return Promise.resolve();
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
          return Promise.resolve();
        },
      }, // Usamos una implementación personalizada para que sea compatible con PersistStorage
    }
  )
);

export default useRewardStore;
