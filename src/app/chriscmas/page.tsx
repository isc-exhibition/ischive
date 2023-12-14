"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [koreanDate, setKoreaDate] = useState('');
  const [koreanTime, setKoreanTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const koreanDate = now.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });
      const koreanTime = now.toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' });
      setKoreaDate(koreanDate);
      setKoreanTime(koreanTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-x-auto overflow-y-auto flex justify-center items-start bg-white">
      <div className="w-[408px] h-auto pt-16 pb-16 bg-[rgb(77,101,169)] rounded-xl relative box-border flex flex-col items-center justify-center">
        <div className="w-full h-full rounded-xl">
          <Image
            src="/assets/img/chrISCmas.jpeg"
            alt="chrISCmas"
            layout="responsive"
            objectFit="cover"
            width={100}
            height={141}
            priority
          />
        </div>
        <p className="text-center mt-2 text-white lg">{koreanDate}    {koreanTime}</p>
      </div>
    </main>
  );
}
