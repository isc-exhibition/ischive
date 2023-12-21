"use client";
import { useEffect, useState } from "react";

import Image from "next/image";

export default function DefaultPage() {
  const [currentImage, setCurrentImage] = useState(
    "/assets/img/chriscmas/present.png",
  );
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    switch (randomNumber) {
      case 1:
        setCurrentImage("/assets/img/chriscmas/1215.png");
        setCurrentMessage(
          "바로 오늘이 과제전!<br/>크리슼마스(chrISCmas)에<br/>어서오세요!",
        );
        break;
      case 2:
        setCurrentImage("/assets/img/chriscmas/1216.png");
        setCurrentMessage(
          "이번 학기 과제와 팀플은 어떠셨나요?<br/>한 학기 동안 여러분들을 위해 준비한<br/>정문 엘프들의 선물(과제)들을 확인하러 오세요!",
        );
        break;
      case 3:
        setCurrentImage("/assets/img/chriscmas/1217.png");
        setCurrentMessage(
          "학기 중에는 가지지 못했던 작은 여유,<br/>크리스마스까지 정무니우스와 함께<br/>가져보시는 건 어떠세요?",
        );
        break;
      case 4:
        setCurrentImage("/assets/img/chriscmas/1218.png");
        setCurrentMessage(
          "이번 학기 동안 여러분이 남긴 발자취<br/>정보문화학 과제전에서 함께 공유해주세요!<br/>남은 이틀, 기다리고 있을게요 ❄",
        );
        break;
      case 5:
        setCurrentImage("/assets/img/chriscmas/1219.png");
        setCurrentMessage(
          "여러분의 한 학기 어떠셨나요?<br/>이번 학기, 여러분이 기울인 노력이<br/>마치 하얀 눈이 쌓이듯,<br/>조금씩 쌓여 아름다운 겨울 풍경을<br/>이루고 있을 거예요.",
        );
        break;
      case 6:
        setCurrentImage("/assets/img/chriscmas/1220.png");
        setCurrentMessage(
          "바로 오늘이 과제전!<br/>즐거운 한 해의 마무리를<br/>chrISCmas<br/>와 함께 해주세요!",
        );
        break;
      default:
        setCurrentImage("/assets/img/chriscmas/1220.png");
        setCurrentMessage(
          "바로 오늘이 과제전!<br/>즐거운 한 해의 마무리를<br/>chrISCmas<br/>와 함께 해주세요!",
        );
        break;
    }
  }, []);

  return (
    <>
      <main className="w-3/5 items-center justify-center">
        <p className="text-overflow-ellipsis absolute left-1/2 top-1/4 -mt-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap text-center text-sm text-white">
          연합전공 정보문화학 23-2 과제전 어드벤트 캘린더
        </p>
        <div className="absolute left-1/2 top-1/2 -mt-52 w-3/5 -translate-x-1/2 transform">
          <Image
            src={currentImage}
            alt="decorator image"
            width={500}
            height={500}
          />
        </div>
        <div>
          <p
            className="absolute left-1/2 top-3/4 -mt-24 w-full -translate-x-1/2 -translate-y-1/2 whitespace-pre-wrap text-center font-SsurroundAir text-base text-white"
            dangerouslySetInnerHTML={{ __html: currentMessage }}
          />
        </div>
      </main>
    </>
  );
}
