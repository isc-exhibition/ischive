import Image from "next/image";
import ISCLogo from "../../../assets/img/logo_archiving.gif";

export default function Header() {
  return (
    <header className="fixed z-50 h-[60px] w-full border-b-2 border-solid border-black bg-white">
      <div className="flex items-center justify-between">
        <Image src={ISCLogo} alt="isc-logo" width={130} />
        <div className="flex flex-row">
          <div className="text-xl">HOME</div>
          <div className="pl-3 text-xl">ABOUT</div>
          <div className="px-3 text-xl">ARCHIVING</div>
        </div>
      </div>
    </header>
  );
}
