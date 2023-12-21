import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center bg-[rgb(187,200,232)]">
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
      <a
        href="/"
        className="mb-4 whitespace-pre-wrap text-center font-SsurroundAir text-sm text-[rgb(111,140,198)] hover:text-white hover:underline"
      >
        🎁 지난 과제들 보러가기 🎁
      </a>
      <a
        href="/chriscmas/calendar"
        className="mb-12 whitespace-pre-wrap text-center font-SsurroundAir text-sm text-[rgb(111,140,198)] hover:text-white hover:underline"
      >
        🎄 지난 어드벤트 캘린더 보러가기 🎄
      </a>
    </div>
  );
}
