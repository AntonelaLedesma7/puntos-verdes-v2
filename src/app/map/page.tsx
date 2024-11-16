'use client';

import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css'; // Importa el CSS de Leaflet aquí
import Navbar from '@/components/navbar';
import * as L from 'leaflet'; // Importa Leaflet con tipado

interface Location {
  coords: [number, number];
  name: string;
  address: string;
  hours: string;
}

export default function MapComponent(): JSX.Element {
  useEffect(() => {
    // Verifica si el código se ejecuta en el cliente
    if (typeof window !== 'undefined') {
      // Verificar si el mapa ya está inicializado
      const mapElement = document.getElementById('map');
      if (mapElement && !mapElement._leaflet_id) {
        const map = L.map('map').setView([-34.6037, -58.3816], 13); // Coordenadas de Buenos Aires

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const iconHtml = `
          <div style="width: 24px; height: 24px; color: var(--background-color);">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-9">
              <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
            </svg>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'custom-marker', // Clase CSS para estilos adicionales
          html: iconHtml,
          iconSize: [24, 24],
        });

        const locations: Location[] = [
          {
            coords: [-34.6037, -58.3816],
            name: 'Punto verde de 9 de Julio',
            address: '9 de Julio, Buenos Aires',
            hours: 'Lunes a Viernes: 9:00 AM - 6:00 PM',
          },
          {
            coords: [-34.6158, -58.4333],
            name: 'Punto verde de Parque Rivadavia',
            address: 'Parque Rivadavia, Buenos Aires',
            hours: 'Todos los días: 8:00 AM - 8:00 PM',
          },
          {
            coords: [-34.6272, -58.3644],
            name: 'Punto verde de La Boca',
            address: 'La Boca, Buenos Aires',
            hours: 'Lunes a Sábado: 10:00 AM - 5:00 PM',
          },
          {
            coords: [-34.5904, -58.3820],
            name: 'Punto verde de Recoleta',
            address: 'Recoleta, Buenos Aires',
            hours: 'Todos los días: 9:00 AM - 7:00 PM',
          },
        ];

        locations.forEach((location) => {
          const popupContent = `
            <div class="p-4">
              <h3 class="text-lg font-semibold text-green-700">${location.name}</h3>
              <p class="text-sm text-gray-700">Dirección: ${location.address}</p>
              <p class="text-sm text-gray-700">Horario: ${location.hours}</p>
            </div>
          `;
          L.marker(location.coords, { icon: customIcon })
            .addTo(map)
            .bindPopup(popupContent);
        });
      }
    }
  }, []);

  return (
    <div className="container mx-auto max-w-[600px] px-4 my-8 text-white">
      <h1 className="mb-4 text-3xl font-bold text-center">Zonas de reciclaje</h1>
      <div id="map" className="w-full h-[800px] rounded-lg mb-4"></div>
      <Navbar />
    </div>
  );
}