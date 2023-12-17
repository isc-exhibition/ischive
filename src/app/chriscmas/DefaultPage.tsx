"use client";

import Image from "next/image";

export default function DefaultPage() {
    return (
      <>
        <main className="w-3/5 items-center justify-center">
          <p className="text-overflow-ellipsis absolute left-1/2 top-1/4 -mt-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap text-center text-sm text-white">
            연합전공 정보문화학 23-2 과제전 어드벤트 캘린더
          </p>
          <div className="absolute w-4/5 left-1/2 top-1/2 -mt-52 -translate-x-1/2 transform">
            <Image
              src="/assets/img/chriscmas/1217.png"
              alt="decorator image"
              width={800}
              height={800}
            />
          </div>
          <div>
            <p className="font-SsurroundAir absolute left-1/2 top-3/4 -mt-24 w-full -translate-x-1/2 -translate-y-1/2 whitespace-pre-wrap text-center text-base text-white">
              {"학기 중에는 가지지 못했던 작은 여유,"}
              <br />
              {"크리스마스까지 정무니우스와 함께"}
              <br />
              {"가져보시는 건 어떠세요?"}
            </p>
          </div>
        </main>
      </>
    );
  }