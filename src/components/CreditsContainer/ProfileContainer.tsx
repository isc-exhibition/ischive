import Image from "next/image";

export default function ProfileContainer({
  team,
  isHead,
  major,
  name,
  account,
  id,
}: {
  team: string;
  isHead: boolean;
  major: string;
  name: string;
  account: string;
  id: number;
}) {
  return (
    <div className="my-6">
      <div className="mx-5 w-40">
        <Image
          src={`/assets/img/profile/${team}_${name}.png`}
          alt={`${team}-${id}`}
          width={10000}
          height={10000}
        />
      </div>
      <div className="my-2 text-center font-bold">{`${team}${
        isHead ? " 팀장" : ""
      }`}</div>
      <div className="text-center">{`${major} ${name}`}</div>
      <div className="text-center text-[#FF5C00]">{account}</div>
    </div>
  );
}
