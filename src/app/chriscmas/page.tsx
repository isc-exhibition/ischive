"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [koreanDate, setKoreaDate] = useState<string>('');
  const [koreanTime, setKoreanTime] = useState<string>('');

  const [screen, setScreen] = useState(0);

  const targetDateTime = new Date(2023, 11, 21, 10, 0, 0).getTime();

  const [dDay, setDDay] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  const handleBoxClick = () => {
    const nextScreen = 1;
    // screen === 0 ? 1 : 2;
    setScreen(nextScreen);
  };

  useEffect(() => {
    // Update the D-Day and time every second
    const interval = setInterval(() => {
      const now = new Date().getTime(); // Get current time in milliseconds
      
      // Calculate the difference in milliseconds
      const difference = targetDateTime - now;

      // Calculate days, hours, minutes and seconds left
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      // Set the D-Day state
      if (difference <= 0) {
        setDDay('D-Day');
        setTimeLeft('과제전에 어서오세요!');
        clearInterval(interval);
      } else {
        setDDay(`과제전까지 D-${days}`);
        setTimeLeft(`${hours}시간 ${minutes}분 ${seconds}초 남았어요`);
      }
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const now = new Date();
  //     const koreanDate = now.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });
  //     const koreanTime = now.toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' });
  //     setKoreaDate(koreanDate);
  //     setKoreanTime(koreanTime);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  return (
  <>
    /** for screen 0 */
    <style jsx>{`
      @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
      }
      
      .shake-animation {
        animation: shake 0.5s ease-in-out 0s infinite;
        animation-delay: 3s; /* Delays the animation by 2 seconds */
        animation-iteration-count: infinite; /* Repeats the animation forever */
      }
    `}</style>

    <main className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-x-auto overflow-y-auto flex justify-center items-start bg-[rgb(77,101,169)]">
      <div className="w-[408px] h-auto bg-white relative box-border rounded-3xl flex flex-col items-center justify-center">
        <div className="w-full h-full relative">
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
        {screen === 0 && (
          <div className="w-3/5 items-center justify-center">
            <p className="absolute top-1/4 left-1/2 -mt-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap overflow-hidden text-overflow-ellipsis text-sm text-center text-white">
              연합전공 정보문화학 23-2 과제전 어드벤트 캘린더
            </p>
            <p className="absolute top-1/4 left-1/2 -mt-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap overflow-hidden text-overflow-ellipsis text-4xl text-center text-white font-SsurroundAir">
              ✷ 터치해서 열기 ✷
            </p>
            <div className="absolute top-1/2 left-1/2 -mt-20 transform -translate-x-1/2 cursor-pointer" onClick={handleBoxClick}>
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
        )}

        {/* {screen === 1 && (
          <div className="w-3/5 items-center justify-center">
            <p className="absolute top-1/4 left-1/2 -mt-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap overflow-hidden text-overflow-ellipsis text-sm text-center text-white">
              연합전공 정보문화학 23-2 과제전 어드벤트 캘린더
            </p>
            <p className="absolute top-1/4 left-1/2 -mt-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap overflow-hidden text-overflow-ellipsis text-4xl text-center text-white font-SsurroundAir">
              ✷ 터치해서 열기 ✷
            </p>
            <div className="absolute top-1/2 left-1/2 -mt-20 transform -translate-x-1/2 cursor-pointer" onClick={handleBoxClick}>
              <Image
                src="/assets/img/chriscmas/present.png"
                alt="Clickable Box"
                width={150}
                height={150}
              />
            </div>
          </div>
        )} */}

        {screen === 1 && ( 
          <div className="w-3/5 items-center justify-center">
            <p className="absolute top-1/4 left-1/2 -mt-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap overflow-hidden text-overflow-ellipsis text-sm text-center text-white">
              연합전공 정보문화학 23-2 과제전 어드벤트 캘린더
            </p>
            <div className="absolute top-1/2 left-1/2 -mt-52 transform -translate-x-1/2 cursor-pointer">
              <Image
                src="/assets/img/chriscmas/1215.png"
                alt="Final Image"
                layout="responsive"
                width={800} // Original aspect ratio width
                height={800} // Original aspect ratio height
                className="w-full h-auto"
              />
            </div>
            <div>
              <p className="w-full absolute top-3/4 left-1/2 -mt-20 -translate-x-1/2 -translate-y-1/2 text-base whitespace-pre-wrap text-center text-white font-SsurroundAir">
              {'드디어 오픈된 정문 어드벤트 캘린더!'}
              <br />
              {'크리슼마스(chrISCmas)까지'}
              <br />
              {'정무니우스와 함께 하나 하나 열어가볼까요?'}
              </p>
            </div>
          </div>
        )}
        <div>
          <p className="w-full absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm whitespace-pre-wrap text-center text-white font-SsurroundAir">
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
