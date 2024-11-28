import { ReactNode } from 'react';
interface RewardsLayoutProps {
  children: ReactNode;
}

export default function RewardsLayout({ children }: RewardsLayoutProps) {
  return (
    <>
      <div className="container mx-auto max-w-[600px] px-4 justify-center my-8 text-white">
        {children}
      </div>
    </>
  );
}
