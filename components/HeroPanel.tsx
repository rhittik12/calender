import Image from 'next/image';

export function HeroPanel() {
  return (
    <div className="relative h-full min-h-[300px] lg:min-h-0">
      <Image
        src="/hero-calendar.svg"
        alt="Spring cherry blossom landscape"
        width={600}
        height={900}
        priority
        className="h-full w-full object-cover"
      />
    </div>
  );
}
