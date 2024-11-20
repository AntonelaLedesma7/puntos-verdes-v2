"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from '@/styles/recycle-page.module.css';
import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import useRecycleStore from "@/app/stores/useRecycleStore";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Location = {
    value: string;
    name: string;
    address: string;
    hours: string;
    imageUrl: string;
    id?: string;
};

export default function Locations() {
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
    const { setSelectedLocation } = useRecycleStore();

    const locations: Location[] = [
      { value: "location1", name: "Punto verde de 9 de Julio", address: "9 de Julio, Buenos Aires", hours: "Lunes a Viernes: 9:00 AM - 6:00 PM", imageUrl: "/assets/location1.jpg" },
      { value: "location2", name: "Punto verde de Parque Rivadavia", address: "Parque Rivadavia, Buenos Aires", hours: "Todos los días: 8:00 AM - 8:00 PM", imageUrl: "/assets/location2.jpg" },
      { value: "location3", name: "Punto verde de La Boca", address: "La Boca, Buenos Aires", hours: "Lunes a Sábado: 10:00 AM - 5:00 PM", imageUrl: "/assets/location3.jpg" },
      { value: "location4", name: "Punto verde de Recoleta", address: "Recoleta, Buenos Aires", hours: "Todos los días: 9:00 AM - 7:00 PM", imageUrl: "/assets/location4.jpg" },
    ];

    useEffect(() => {
        if (locations && locations.length > 0) {
          const defaultLocation = locations[0];
      
          if (!currentLocation || currentLocation.value !== defaultLocation.value) {
            setCurrentLocation(defaultLocation);
            setSelectedLocation(defaultLocation);
          }
        }
    }, [locations, currentLocation, setSelectedLocation]);

    const handleLocationChange = (value: string) => {
        const selectedLocation = locations.find((location) => location.value === value) || null;
        setSelectedLocation(selectedLocation);
        setCurrentLocation(selectedLocation);
    };

    return (
        <div className="grid gap-6">
            <div className="mb-3 text-3xl text-center">
                <h1 className="font-bold">Lugares de reciclados</h1>
            </div>
            <div className="mb-5">
            {currentLocation && (
                <Image
                    src={currentLocation.imageUrl}
                    alt={`Imagen de ${currentLocation.name}`}
                    className="object-cover w-full rounded-lg h-60 max-h-64"
                    width={400}
                    height={400}
                />
            )}
            </div>

            {currentLocation ? (
                <div className="mb-5 p-4 bg-[--color-secundary] border-l-8 border-[--color-primary] rounded-lg drop-shadow-[0_35px_35px_rgba(0,0,0,100)]">
                    <p className="mb-2 text-lg font-semibold">{currentLocation.name}</p>
                    <div className="flex items-center mb-3">
                        <MapPinIcon className="w-6 h-6 mr-2" />
                        <p>{currentLocation.address}</p>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="w-6 h-6 mr-2" />
                        <p>{currentLocation.hours}</p>
                    </div>
                </div>
            ) : (
                <p>Selecciona una ubicación para ver los detalles</p>
            )}
            
            <hr className="border-[--color-secundary]" />
            <p>Elige el lugar donde vas a llevar el reciclaje</p>
            <div>
                <Select defaultValue={locations[0].value} onValueChange={handleLocationChange}>
                    <SelectTrigger className={`${styles.selectTrigger} w-[280px] text-black`}>
                        <SelectValue placeholder="Selecciona una ubicación" />
                    </SelectTrigger>
                    <SelectContent className={styles.selectContent}>
                        <SelectGroup>
                            <SelectLabel className={styles.selectLabel}>Ubicaciones de reciclaje</SelectLabel>
                            {locations.map((location) => (
                                <SelectItem key={location.value} value={location.value} className={styles.selectItem}>
                                    <div className="flex items-center">
                                        <MapPinIcon className="w-4 h-4 mr-2" />
                                        <span>{location.name}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            
            <div className='flex justify-center gap-4'>
                <Link href="./" className={buttonVariants({ variant: "secondary", size: "lg", className: "font-bold" })}>
                        Volver
                </Link>
                <Link href="locations/1" className={buttonVariants({ variant: "default", size: "lg", className: "font-bold" })}>
                    Siguiente
                </Link>
            </div>
        </div>
    );
}