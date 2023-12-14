/* 
main/page.tsx:
  Describes /main
*/
"use client";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./progressbar.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
const TWEEN_FACTOR = 3;

const numberWithinRange = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);

export default function Main() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: false });
  const [tweenValues, setTweenValues] = useState<
    { scale: number; opacity: number }[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(0); // State to track the current slide index

  const slides = [
    {
      semester: "2023-2",
      name: "ChrISCmas",
      date: "2023.12.21(목) ~ 2023.12.22(금)",
      link: "https://www.instagram.com/p/C0VZk0XvKpF/?img_index=1",
      url: "/assets/img/poster/poster23_2.png",
    },
    {
      semester: "2023-1",
      name: "꿈(과제)과 환상(팀플)의 나라, 정문랜드",
      date: "2023.6.19(월) ~ 2023.6.20(화)",
      link: "https://www.instagram.com/p/Ctf7Q0Pte9Z/?img_index=1",
      url: "/assets/img/poster/poster23_1.gif",
    },
    {
      semester: "2022-2",
      name: 'new_ISC = ITCT("20th")',
      date: "2022.12.15 - 2022.12.17",
      link: "https://www.instagram.com/p/CmEjLmgLXzs/",
      url: "/assets/img/poster/poster22_2.png",
    },
    {
      semester: "2022-1",
      name: "지옥에서 돌아온 과제전",
      date: "2022.06.23.-2022.06.24.",
      link: "https://www.instagram.com/p/Ce3JxECPL7M/",
      url: "/assets/img/poster/poster22_1.png",
    },
    {
      semester: "2021-2",
      name: "정보문花원",
      date: "2021.12.27-(온라인)",
      link: "https://www.instagram.com/p/CXxh_sgPv25/",
      url: "/assets/img/poster/poster21_2.png",
    },
    {
      semester: "2021-1",
      name: "비대면수업_최종_진짜_제발.isc",
      date: "2021.06.21-2021.06.22 (온라인)",
      link: "https://www.instagram.com/p/CP6B-zsDsrG/",
      url: "/assets/img/poster/poster21_1.png",
    },
    {
      semester: "2020-2",
      name: "과제전제과",
      date: "2020.12.17-2020.12.23 (온라인)",
      link: "https://www.instagram.com/p/CIW2p7qDwXU/",
      url: "/assets/img/poster/poster20_2.png",
    },
    {
      semester: "2020-1",
      name: "정문과제전 정상영업중",
      date: "2020.06.29-2020.07.02 (온라인)",
      link: "https://www.instagram.com/p/CBiocmFnjv3/",
      url: "/assets/img/poster/poster20_1.png",
    },
    {
      semester: "2019-2",
      name: "막갈리는 과제전집",
      date: "2019.12.19-2019.12.20",
      link: "https://www.facebook.com/itctfestival/posts/pfbid0sC1EvL8ChD71i1Eo95MXV3vL57EnZ3Jy2Br8ZLLdvbrmeGvUANM4KrdQYJMsHFFKl",
      url: "/assets/img/poster/poster19_2.png",
    },
    {
      semester: "2019-1",
      name: "그 많던 과제는 누가 다 했을까?",
      date: "2019.06.20-2019.06.21",
      link: "https://www.facebook.com/itctfestival/posts/pfbid0x3smwR6WpFWfArjg2uN7P97VvBDpmxp1AfUC6VwBN152hhBL1LVuhKRtTKFaBBEJl",
      url: "/assets/img/poster/poster19_1.png",
    },
    {
      semester: "2018-2",
      name: "정문굴림체.ttf",
      date: "2018.12.20-2018.12.21",
      link: "https://www.facebook.com/itctfestival/posts/pfbid02PZ1zeME4enMG8Mv2wnhVqzs5X6Ko4tTZhPAKFLuTSggUha2ehpwYZiXxVJmuBQQfl",
      url: "/assets/img/poster/poster18_2.png",
    },
    {
      semester: "2018-1",
      name: "TOO MUCH INFORMATION",
      date: "2018.06.21-2018.06.22",
      link: "https://www.facebook.com/itctfestival/posts/pfbid02EVwCggpZDDnGin2QvpSR9Y8WmQDmkN9bseCiADT5qxCcP6E6tfgXReNv43L8HiQsl",
      url: "/assets/img/poster/poster18_1.png",
    },
    {
      semester: "2017-2",
      name: "미리 크리스마스 나홀로 과제전",
      date: "2017.12.20-2017.12.21",
      link: "https://www.facebook.com/itctfestival/posts/pfbid0fHaWq4h1YMPGZxSU4Ym2PtDXCLrnWkLSzQHZpJ76ScJPkUdkEVS8i4Crqh5ajVcCl",
      url: "/assets/img/poster/poster17_2.png",
    },
    {
      semester: "2017-1",
      name: "과제가 먼-지!",
      date: "2017.06.15-2017.06.16",
      link: "https://www.facebook.com/itctfestival/photos/a.956038477838340/1290210451087806/",
      url: "/assets/img/poster/poster17_1.png",
    },
    {
      semester: "2016-2",
      name: "저희에게 시간과 예산을 조금만 더 주신다면...",
      date: "2016.12.15-2016.12.16",
      link: "https://www.facebook.com/itctfestival/photos/a.956038477838340/1098689823573204/",
      url: "/assets/img/poster/poster16_2.png",
    },
    {
      semester: "2016-1",
      name: "현자의 시간",
      date: "2016.06.16-2016.06.17",
      link: "https://www.facebook.com/itctfestival/posts/pfbid02qk8W2Dx2S82wQTqGZAooqjkhLst19CxcbcWw8ePzFjQ1wVSpPQvaZiemwXrzRzjYl",
      url: "/assets/img/poster/poster16_1.png",
    },
    {
      semester: "2015-2",
      name: "SUICIDAL SQUAD",
      date: "2015.12.17-2015.12.18",
      link: "https://www.facebook.com/itctfestival/posts/pfbid0an291g6n6RaBtoMcYBNcATZT1GJKA87HvPbi4N1nuAL4RNodWuvUingAVczSzVghl",
      url: "/assets/img/poster/poster15_2.png",
    },
    {
      semester: "2015-1",
      name: "대안학교",
      date: "2015.06.22-2015.06.23",
      link: "https://cls.snu.ac.kr/board/notice/view/12782",
      url: "/assets/img/poster/poster15_1.png",
    },
    {
      semester: "2013-2",
      name: "이게뭐야",
      date: "2013.12.02-2013.12.04",
      link: "https://www.facebook.com/groups/snuisc/posts/573274652727961",
      url: "/assets/img/poster/poster13_2.png",
    },
  ];
  const handlePrevious = () => {
    embla?.scrollPrev();
  };
  const handleNext = () => {
    embla?.scrollNext();
  };
  const onScroll = useCallback(() => {
    if (!embla) return;

    const scrollProgress = embla.scrollProgress();
    const styles = embla.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;
      if (Math.abs(diffToTarget) > 0.3) {
        return { scale: 0, opacity: 0 };
      } else {
        const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR);
        const scale = numberWithinRange(tweenValue, 0.8, 1.5); // Scale up to 1.2 for the middle slide
        const opacity = numberWithinRange(tweenValue, 0, 1);
        return { scale, opacity };
      }
    });

    setTweenValues(styles);
  }, [embla]);
  const updateSelectedIndex = useCallback(() => {
    if (embla) {
      setSelectedIndex(embla.selectedScrollSnap());
    }
  }, [embla]);
  useEffect(() => {
    if (!embla) return;

    onScroll();
    embla.on("scroll", onScroll);
    embla.on("reInit", onScroll);
    updateSelectedIndex();
    embla.on("select", updateSelectedIndex);
    embla.on("init", updateSelectedIndex);
  }, [embla, onScroll, updateSelectedIndex]);

  const onProgressBarClick = (event: {
    currentTarget: any;
    clientX: number;
  }) => {
    if (!embla) return;

    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickedPositionX = event.clientX - rect.left; // get the x position of the click
    const clickedPositionRatio = clickedPositionX / rect.width; // get the click position as a ratio of the progress bar width

    const slideToGo = Math.floor(clickedPositionRatio * slides.length);
    embla.scrollTo(slideToGo);
  };

  const renderProgressBar = () => {
    return (
      <div className="progress-bar-container" onClick={onProgressBarClick}>
        <div className="progress-bar">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`progress-bar__segment ${
                index === selectedIndex ? "active" : ""
              }`}
              style={{ width: `${100 / slides.length}%` }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <h2>서울대학교 정보문화학 연합전공</h2>

      <div className=" border-t-2 border-solid border-black pt-6">
        <div className="relative mx-auto max-w-screen-md ">
          <button
            aria-label="go to previous slide"
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2  items-center justify-center rounded-full bg-white bg-opacity-40 text-black shadow-md"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            aria-label="go to next slide"
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white bg-opacity-40 text-black shadow-md"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex ">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="mx-4 aspect-auto flex-[0_0_100%] "
                  style={{
                    transform: `scale(${tweenValues[index]?.scale || 1})`,
                    opacity: `${tweenValues[index]?.opacity || 1}`,
                    transition: "transform 0.3s, opacity 0.3s",
                  }}
                >
                  <div className="my-2 text-center">
                    <h1>{slide.semester}</h1>
                    <h2>{slide.name}</h2>
                  </div>

                  <div className="flex items-center justify-center align-middle">
                    <Image
                      src={slide.url}
                      alt={slide.name}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[30vw] rounded-lg object-contain shadow-md"
                    />
                  </div>

                  <div className="my-2 text-center">
                    <h4>{slide.date}</h4>
                  </div>
                  <button
                    onClick={() => (window.location.href = slide.link)}
                    className="mx-auto block  rounded-md bg-orange-500 px-4 py-2 text-white"
                  >
                    보러가기
                  </button>
                </div>
              ))}
            </div>
            {renderProgressBar()} {/* Render the progress bar */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
