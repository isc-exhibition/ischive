import Image from "next/image";

export default function ProfileContainer({
  team,
  isHead,
  major,
  name,
  account,
  key,
}: {
  team: string;
  isHead: boolean;
  major: string;
  name: string;
  account: string;
  key: number;
}) {
  return (
    <div className="my-6">
      <Image
        src={require(`../../assets/img/profile/${team}_${name}.png`)}
        alt={`${team}-${key}`}
        className="mx-5 w-40"
      />
      <div className="my-2 text-center font-bold">{`${team}${
        isHead ? " 팀장" : ""
      }`}</div>
      <div className="text-center">{`${major} ${name}`}</div>
      <div className="text-center text-[#FF5C00]">{account}</div>
    </div>
  );
}
