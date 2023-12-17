"use client";

import Image from "next/image";

export default function PrizePage() {
    return (
      <>
        <main className="w-3/5 items-center justify-center">
          <p className="text-overflow-ellipsis absolute left-1/2 top-1/4 -mt-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap text-center text-sm text-white">
            연합전공 정보문화학 23-2 과제전 어드벤트 캘린더
          </p>
          <div className="absolute w-3/5 left-1/2 top-1/2 -mt-52 -translate-x-1/2 transform">
            <Image
              src="/assets/img/chriscmas/prize.png"
              alt="decorator image"
              width={500}
              height={500}
            />
          </div>
          <div>
            <p className="font-SsurroundAir absolute left-1/2 top-3/4 -mt-24 w-full -translate-x-1/2 -translate-y-1/2 whitespace-pre-wrap text-center text-base text-white">
              {"쿠키 정무니우스 자잔 등장!"}
              <br />
              {"정보문화학 과제전에 오셔서"}
              <br />
              {"달콤한 크리스마스 간식을 받아가세요"}
            </p>
            <p className="font-SsurroundAir absolute left-1/2 top-3/4 -translate-y-14 w-full -translate-x-1/2 whitespace-pre-wrap text-center text-xs text-[rgb(179,199,254)]">
              *해당 화면 캡처를 과제전 당일 스태프들에게 보여주세요*
            </p>
          </div>
        </main>
      </>
    );
  }