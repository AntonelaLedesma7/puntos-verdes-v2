import { ReactNode } from 'react';

interface RecycleLayoutProps {
  children: ReactNode;
}

export default function RecycleLayout({ children }: RecycleLayoutProps) {
  return (
    <div className="container mx-auto max-w-[600px] px-4 justify-center my-8 text-white">
      {children}
    </div>
  );
}