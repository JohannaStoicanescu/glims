import Image from 'next/image';

interface GlimsDisplayProps {
  glims: [];
}

export default function GlimsDisplay({ glims }: GlimsDisplayProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {glims.map((glim, index) => (
        <Image
          key={glim + index}
          alt="Glim image"
          src={glim}
          width={640}
          height={480}
        />
      ))}
    </div>
  );
}
