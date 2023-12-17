"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  /* for d-day */
  const [koreanDate, setKoreaDate] = useState<string>("");
  const [koreanTime, setKoreanTime] = useState<string>("");
  const targetDateTime = new Date(2023, 11, 21, 10, 0, 0).getTime();
  const [dDay, setDDay] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  /* animation */
  const [isPresentClicked, setIsPresentClicked] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  const handleBoxClick = () => {
    setIsPresentClicked(true);
    setTimeout(() => {
      setIsAnimationDone(true);
    }, 3000);
  };

  useEffect(() => {
    // Update the D-Day and time every second
    const interval = setInterval(() => {
    const now = new Date().getTime();

    // Calculate the difference in milliseconds
    const difference = targetDateTime - now;

    // Calculate days, hours, minutes and seconds left
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    // Set the D-Day state
    if (difference <= 0) {
      setDDay("D-Day");
      setTimeLeft("과제전에 어서오세요!");
      clearInterval(interval);
    } else {
      setDDay(`과제전까지 D-${days}`);
      setTimeLeft(`${hours}시간 ${minutes}분 ${seconds}초 남았어요`);
    }
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [targetDateTime]);

  /* css for animation */
  const animationStyles = `
    @keyframes shake {
      0% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-5px);
      }
      50% {
        transform: translateX(5px);
      }
      75% {
        transform: translateX(-5px);
      }
      100% {
        transform: translateX(0);
      }
    }
    @keyframes glow {
      0% { opacity: 0.5; transform: scale(0.3); }
      100% { opacity: 1; transform: scale(1); }
    }
    .glow-animation {
      animation: glow 3s ease-in-out forwards;
      z-index: -1;
    }
    .shake-animation {
      animation: shake 0.5s ease-in-out 0s infinite;
      animation-delay: 1.5s;
      animation-iteration-count: infinite;
    }
  `;

  return (
    <>
      <style jsx>{animationStyles}</style>

      <main className="fixed left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-start justify-center overflow-x-auto overflow-y-auto bg-[rgb(77,101,169)]">
        <div className="relative box-border flex h-auto w-[408px] flex-col items-center justify-center rounded-3xl bg-white">
          
          <div className="relative h-full w-full">
            <Image
              src="/assets/img/chriscmas/background.png"
              alt="chrISCmas poster"
              layout="responsive"
              objectFit="cover"
              width={100}
              height={141}
              priority
              className="rounded-3xl"
            />
          </div>
          {!isAnimationDone && (
            <div className="w-3/5 items-center justify-center">
              <p className="text-overflow-ellipsis absolute left-1/2 top-1/4 -mt-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap text-center text-sm text-white">
                연합전공 정보문화학 23-2 과제전 어드벤트 캘린더
              </p>
              <p className="text-overflow-ellipsis font-SsurroundAir absolute left-1/2 top-1/4 -mt-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap text-center text-4xl text-white">
                ✷ 터치해서 열기 ✷
              </p>
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
              >
                <div className="relative flex items-center justify-center" onClick={handleBoxClick}>
                  {isPresentClicked && !isAnimationDone && (
                    <div className="absolute m-auto -translate-y-1/2 glow-animation" style={{ width: '400px', height: '400px'}}>
                      <Image
                        src="/assets/img/chriscmas/glow.png"
                        alt="Glow"
                        layout="fill"
                      />
                    </div>
                  )}
                  
                  <div className="shake-animation">
                    <Image
                      src="/assets/img/chriscmas/present.png"
                      alt="Clickable Box"
                      width={150}
                      height={150}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {isAnimationDone && (
            <div className="w-3/5 items-center justify-center">
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
            </div>
          )}
          <div>
            <p className="font-SsurroundAir absolute left-1/2 top-3/4 w-full -translate-x-1/2 -translate-y-1/2 whitespace-pre-wrap text-center text-sm text-white">
              {dDay}
              <br />
              {timeLeft}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}