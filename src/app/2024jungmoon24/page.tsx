import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#DAC599]">
      <div className="relative w-full max-w-md drop-shadow-lg md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <Image
          src="/assets/img/2024jungmoon24/2024jungmoon24.png"
          alt="Centered Image"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
    </div>
  );
}
