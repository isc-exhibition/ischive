import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col items-center bg-[rgb(77,101,169)]">
      <div className="h-auto w-[408px]">
        <Image
          src={"/assets/img/chriscmas/pamphlet.png"}
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
