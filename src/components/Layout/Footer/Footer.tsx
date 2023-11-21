import Image from "next/image";
import SNULogo from "../../../assets/img/snu_ui_small.png";
import EmailLogo from "../../../assets/img/email_small.png";

export default function Footer() {
  return (
    <footer className="mt-auto flex flex-col bg-black pl-5">
      <div className="items-center">
        {/* line 1 */}
        <div className="flex flex-row items-center pb-2 pt-4">
          <div className="w-[20px] sm:w-[28px]">
            <Image src={SNULogo} alt="snu-logo" width={10000} />
          </div>
          <p className="pl-2 text-sm font-light text-white sm:text-lg">
            서울대학교 연합전공 정보문화학 과제 아카이빙 웹사이트
          </p>
        </div>
        {/* line 2 */}
        <div className="flex flex-row items-center pb-4 pt-2">
          <div className="w-[20px] sm:w-[28px]">
            <Image src={EmailLogo} alt="email" width={10000} />
          </div>
          <p className="pl-2 text-sm font-light text-white sm:text-lg">
            snuiscexhibition@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
