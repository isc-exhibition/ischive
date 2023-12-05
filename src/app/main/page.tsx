/* 
main/page.tsx:
  Describes /main
*/
'use client'
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import { useEffect, useRef, useState,useCallback } from 'react';
import  useEmblaCarousel  from 'embla-carousel-react';
//import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
const TWEEN_FACTOR = 3;

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max);


export default function main() {
    const [emblaRef, embla] = useEmblaCarousel({ loop: false });
    const [tweenValues, setTweenValues] = useState([]);

    const slides = [
        {
          semester: '2023-1',
          name: '꿈(과제)과 환상(팀플)의 나라, 정문랜드',
          date: '2023.6.19(월) ~ 2023.6.20(화)',
          link: 'https://www.instagram.com/p/Ctf7Q0Pte9Z/?img_index=1',
          url: "/assets/img/poster/poster23_1.gif"
        },
        {
          semester: '2022-2',
          name: 'new_ISC = ITCT("20th")',
          date: '2022.12.15 - 2022.12.17',
          link: 'https://www.instagram.com/p/CmEjLmgLXzs/',
          url: "/assets/img/poster/poster22_2.png"
        },
        {
          semester: '2022-1',
          name: '지옥에서 돌아온 과제전',
          date: '2022.06.23.-2022.06.24.',
          link: 'https://www.instagram.com/p/Ce3JxECPL7M/',
          url: "/assets/img/poster/poster22_1.png"
        },
        {
          semester: '2021-2',
          name: '정보문花원',
          date: '2021.12.27-(온라인)',
          link: 'https://www.instagram.com/p/CXxh_sgPv25/',
          url: "/assets/img/poster/poster21_2.png"
        },
        {
          semester: '2021-1',
          name: '비대면수업_최종_진짜_제발.isc',
          date: '2021.06.21-2021.06.22 (온라인)',
          link: 'https://www.instagram.com/p/CP6B-zsDsrG/',
          url: "/assets/img/poster/poster21_1.png"
        },
        {
          semester: '2020-2',
          name: '과제전제과',
          date: '2020.12.17-2020.12.23 (온라인)',
          link: 'https://www.instagram.com/p/CIW2p7qDwXU/',
          url: "/assets/img/poster/poster20_2.png"
        },
        {
          semester: '2020-1',
          name: '정문과제전 정상영업중',
          date: '2020.06.29-2020.07.02 (온라인)',
          link: 'https://www.instagram.com/p/CBiocmFnjv3/',
          url: "/assets/img/poster/poster20_1.png"
        },
        {
          semester: '2019-2',
          name: '막갈리는 과제전집',
          date: '2019.12.19-2019.12.20',
          link: 'https://www.facebook.com/itctfestival/posts/pfbid0sC1EvL8ChD71i1Eo95MXV3vL57EnZ3Jy2Br8ZLLdvbrmeGvUANM4KrdQYJMsHFFKl',
          url: "/assets/img/poster/poster19_2.png"
        },
        {
          semester: '2019-1',
          name: '그 많던 과제는 누가 다 했을까?',
          date: '2019.06.20-2019.06.21',
          link: 'https://www.facebook.com/itctfestival/posts/pfbid0x3smwR6WpFWfArjg2uN7P97VvBDpmxp1AfUC6VwBN152hhBL1LVuhKRtTKFaBBEJl',
          url: "/assets/img/poster/poster19_1.png"
        },
        {
            semester: '2018-2',
            name: '정문굴림체.ttf',
            date: '2018.12.20-2018.12.21',
            link: 'https://www.facebook.com/itctfestival/posts/pfbid02PZ1zeME4enMG8Mv2wnhVqzs5X6Ko4tTZhPAKFLuTSggUha2ehpwYZiXxVJmuBQQfl',
            url: "/assets/img/poster/poster18_2.png"
          },
        {
            semester: '2018-1',
            name: 'TOO MUCH INFORMATION',
            date: '2018.06.21-2018.06.22',
            link: 'https://www.facebook.com/itctfestival/posts/pfbid02EVwCggpZDDnGin2QvpSR9Y8WmQDmkN9bseCiADT5qxCcP6E6tfgXReNv43L8HiQsl',
            url: "/assets/img/poster/poster18_1.png"
          },
          {
            semester: '2017-2',
            name: '미리 크리스마스 나홀로 과제전',
            date: '2017.12.20-2017.12.21',
            link: 'https://www.facebook.com/itctfestival/posts/pfbid0fHaWq4h1YMPGZxSU4Ym2PtDXCLrnWkLSzQHZpJ76ScJPkUdkEVS8i4Crqh5ajVcCl',
            url: "/assets/img/poster/poster17_2.png"
          },
          {
            semester: '2017-1',
            name: '과제가 먼-지!',
            date: '2017.06.15-2017.06.16',
            link: 'https://www.facebook.com/itctfestival/photos/a.956038477838340/1290210451087806/',
            url: "/assets/img/poster/poster17_1.png"
          },
          {
            semester: '2018-1',
            name: 'TOO MUCH INFORMATION',
            date: '2018.06.21-2018.06.22',
            link: 'https://www.facebook.com/itctfestival/posts/pfbid02EVwCggpZDDnGin2QvpSR9Y8WmQDmkN9bseCiADT5qxCcP6E6tfgXReNv43L8HiQsl',
            url: "/assets/img/poster/poster18_1.png"
          },
          {
            semester: '2018-1',
            name: 'TOO MUCH INFORMATION',
            date: '2018.06.21-2018.06.22',
            link: 'https://www.facebook.com/itctfestival/posts/pfbid02EVwCggpZDDnGin2QvpSR9Y8WmQDmkN9bseCiADT5qxCcP6E6tfgXReNv43L8HiQsl',
            url: "/assets/img/poster/poster18_1.png"
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
            if (Math.abs(diffToTarget) > 0.5) { 
                return { scale: 0, opacity: 0 };
            } else {
                const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR);
                return {
                    scale: numberWithinRange(tweenValue, 0, 1),
                    opacity: numberWithinRange(tweenValue, 0.5, 1)
                };
            }
        });
  
        setTweenValues(styles);
      }, [embla]);
  
      useEffect(() => {
        if (!embla) return;
  
        onScroll();
        embla.on('scroll', onScroll);
        embla.on('reInit', onScroll);
      }, [embla, onScroll]);

  return (
    <Layout>
      {/* h1: isc exhibitions */}
      <h1>ISC</h1>
        <div className='flex justify-center items-center'>
        <div className='relative w-full max-w-screen-md mx-auto'> 
            <button
                aria-label='go to previous slide'
                onClick={handlePrevious}
                className='h-8 w-8 rounded-full flex items-center justify-center bg-white bg-opacity-40  absolute top-1/2 -translate-y-1/2 z-10 shadow-md left-4 text-black'
            >
            </button>
            <button
                aria-label='go to next slide'
                onClick={handleNext}
                className='h-8 w-8 rounded-full flex items-center justify-center bg-white bg-opacity-40 absolute top-1/2 -translate-y-1/2 z-10 shadow-md right-4 text-black'
            >
            </button>
            <div className='overflow' ref={emblaRef} >
                <div className='flex'>
                    {slides.map((slide, index) => (
                    <div key={index} className='flex-[0_0_100%] aspect-video mx-4' style={{
                        transform: `scale(${tweenValues[index]?.scale || 1})`,
                        opacity: `${tweenValues[index]?.opacity || 1}`,
                        transition: 'transform 0.3s, opacity 0.3s'
                            }}>
                        <div className='text-center my-2'>
                            <h1>{slide.semester}</h1>
                            <h2>{slide.name}</h2>
                        </div>


                        <div className='flex justify-center items-center h-full'>
                            <img
                                src={slide.url}
                                alt={slide.name}
                                className='w-auto h-full object-cover rounded-lg'
                                />
                        </div>
                        
                        <div className='text-center my-2'>
                            <h2>{slide.date}</h2>
                        </div>
                                    <button
                                        onClick={() => window.location.href = slide.link}
                                        className='mx-auto block bg-orange-500 text-white py-2 px-4 rounded-md'>
                                        Link
                                    </button>
                    </div>
                    ))}

                </div>
            </div>
        </div>
        </div>
     
      
    </Layout>
  );
}
