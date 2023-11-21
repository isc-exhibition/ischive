import Image from "next/image";
import SNULogo from "../../../assets/img/snu_ui_small.png";
import EmailLogo from "../../../assets/img/email_small.png";

export default function Footer() {
  return (
    <footer className="mt-auto flex flex-col bg-black pl-5">
      <div className="items-center">
        {/* line 1 */}
        <div className="flex flex-row items-center py-3">
          <Image src={SNULogo} alt="SNULogo" />
          <p className="text-white ">
            서울대학교 연합전공 정보문화학 과제 아카이빙 웹사이트
          </p>
        </div>
        {/* line 2 */}
        <div className="flex flex-row items-center py-3">
          <Image src={EmailLogo} alt="email" />
          <p className="text-white">snuiscexhibition@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
