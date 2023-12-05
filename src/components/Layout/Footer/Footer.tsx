/* 
Header.tsx:
    Describes a footer that will be on the bottom of every page
    One of the children of Layout
*/

import Image from "next/image";
import {EnvelopeIcon} from '@heroicons/react/24/outline';
export default function Footer() {
  return (
    /* footer fixed at the bottom of the page */
    <footer className="mt-auto flex flex-col bg-black pl-5">
      <div className="items-center">
        {/* line 1 */}
        <div className="flex flex-row items-center pb-2 pt-4">
          <div className="w-[20px] sm:w-[28px]">
            <Image
              src="/assets/img/snu_ui_download.svg"
              alt="snu-logo"
              width={10000}
              height={10000}
            />
          </div>
          <p className="pl-2 text-sm text-white sm:text-lg">
            서울대학교 연합전공 정보문화학 과제 아카이빙 웹사이트
          </p>
        </div>

        {/* line 2 */}
        <div className="flex flex-row items-center pb-4 pt-2">
          <div className="w-[20px] sm:w-[28px]">
          <EnvelopeIcon className='w-100 h-100 text-white' />
          </div>
          <p className="pl-2 text-sm text-white sm:text-lg">
            snuiscexhibition@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
