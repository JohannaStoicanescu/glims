import Image from 'next/image';

export default function SideDisplay() {
  return (
    <div className="bg-orange-400 h-2/3 md:w-1/2 md:h-screen hidden md:block">
      <div className="flex justify-center mt-16">
        <Image
          src={'/glims-logo-blanc.png'}
          alt={'Logo textuel de Glims'}
          className="md:hidden"
          width={120}
          height={120}
        />
      </div>
    </div>
  );
}
