import Image from "next/image";
import ISCLogo from "../../../assets/img/logo_archiving.gif";

export default function Header() {
  return (
    <header className="relative flex h-[60px] flex-row items-center justify-between">
      <Image src={ISCLogo} alt="isc-logo" width={130} />
      <div className="flex flex-row">
        <div>HOME</div>
        <div className="pl-3">ABOUT</div>
        <div className="px-3">ARCHIVING</div>
      </div>
    </header>
  );
}
