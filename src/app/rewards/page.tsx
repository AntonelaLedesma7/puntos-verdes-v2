'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CoinsIcon from '/public/icons/coins.svg';
import TicketIcon from '/public/icons/ticket.svg';
import useRewardStore from '@/app/stores/useRewardStore';
import Navbar from '@/components/navbar';

interface Reward {
  id: number;
  discount: string;
  category: string;
  cost: number;
  details: string;
  expiration: string;
}

export default function RewardsPage() {
  const router = useRouter();
  const { userPoints, setSelectedReward } = useRewardStore();
  const [searchTerm, setSearchTerm] = useState('');

  const rewards: Reward[] = [
    {
      id: 1,
      discount: '15%',
      category: 'Supermercado Día',
      cost: 200,
      details: 'Detalles del cupón 1',
      expiration: '31/12/2024',
    },
    {
      id: 2,
      discount: '20%',
      category: 'Supermercado Carrefour',
      cost: 300,
      details: 'Detalles del cupón 2',
      expiration: '30/11/2024',
    },
    {
      id: 3,
      discount: '10%',
      category: 'Supermercado Coto',
      cost: 150,
      details: 'Detalles del cupón 3',
      expiration: '15/01/2025',
    },
    {
      id: 4,
      discount: '25%',
      category: 'Veterinaria Los Amigos',
      cost: 400,
      details: 'Detalles del cupón 4',
      expiration: '20/12/2024',
    },
    {
      id: 5,
      discount: '30%',
      category: 'Veterinaria Shrek',
      cost: 250,
      details: 'Detalles del cupón 5',
      expiration: '28/12/2024',
    },
    {
      id: 6,
      discount: '20%',
      category: 'Pizzería El Hornito',
      cost: 300,
      details: 'Detalles del cupón 6',
      expiration: '10/12/2024',
    },
    {
      id: 7,
      discount: '15%',
      category: 'Restaurante Tinta Roja',
      cost: 200,
      details: 'Detalles del cupón 7',
      expiration: '31/01/2025',
    },
    {
      id: 8,
      discount: '10%',
      category: 'Tienda Solo Deportes',
      cost: 100,
      details: 'Detalles del cupón 8',
      expiration: '05/01/2025',
    },
    {
      id: 9,
      discount: '5%',
      category: 'Tienda Movisar',
      cost: 50,
      details: 'Detalles del cupón 9',
      expiration: '20/01/2025',
    },
  ];

  const filteredRewards = rewards.filter((reward) =>
    reward.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRewardClick = (reward: Reward) => {
    setSelectedReward(reward);
    router.push(`/rewards/${reward.id}`);
  };

  return (
    <div className='container mx-auto max-w-[600px] px-4 grid gap-[20px] justify-center'>
      <div className='mb-8 text-3xl text-center'>
        <h1 className='font-bold'>Recompensas</h1>
      </div>
      <div className='flex flex-col items-center justify-between p-4 rounded-lg'>
        <h4 className='text-xl font-semibold text-center'>
          Puntos disponibles
        </h4>
        <div className='flex items-center'>
          <CoinsIcon className='w-6 h-6 text-[--color-primary]' />
          <p className='ml-2 text-3xl font-bold'>{userPoints}</p>
          {/* <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Recompensas</h1>
      
      <div className="bg-[--color-secundary] rounded-lg p-6 mb-8">
        <h2 className='mb-4 text-xl font-semibold text-center'>Puntos disponibles</h2>
        <div className="flex items-center justify-center">
          <CoinsIcon className="w-8 h-8 text-[--color-primary] mr-2" />
          <p className="text-4xl font-bold">{userPoints}</p> */}
        </div>
      </div>

      <div className='mb-8'>
        <label htmlFor='search' className='block mb-2 text-lg font-medium'>
          Buscar recompensas
        </label>
        <input
          id='search'
          type='text'
          placeholder='Buscar por categoría...'
          className='w-full p-3 text-gray-900 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-100'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        {filteredRewards.map((reward) => (
          <div
            key={reward.id}
            onClick={() => handleRewardClick(reward)}
            className='p-6 transition-all bg-[--color-secundary] rounded-lg hover:bg-gray-700 flex flex-col items-center cursor-pointer'
          >
            <div className='mb-4'>
              <TicketIcon className='w-16 h-16 text-[--color-primary]' />
            </div>
            <p className='mb-2 text-2xl font-bold'>{reward.discount}</p>
            <p className='text-lg text-center'>{reward.category}</p>
          </div>
        ))}
      </div>
      <Navbar />
    </div>
  );
}
