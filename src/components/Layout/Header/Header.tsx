import Image from "next/image";
import ISCLogo from "../../../assets/img/logo_archiving.gif";

export default function Header() {
  return (
    <header className="relative flex flex-row items-start justify-start">
      <div className="">
        <Image src={ISCLogo} alt="isc-logo" width={130} />
      </div>
    </header>
  );
}
