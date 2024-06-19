import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center ">
      <div className="h-auto w-[408px]">
        <Image
          src={"/assets/img/2024jungmoon24/2024-1_pamplet.png"}
          alt="pamphlet"
          width={0}
          height={0}
          sizes="100vw"
          className="relative h-full w-full"
        />
      </div>
    </div>
  );
}

