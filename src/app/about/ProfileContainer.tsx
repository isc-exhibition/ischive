import Image from "next/image";

function ProfileContainer({
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
    <div>
      <Image
        src={require(`../../assets/img/profile/${team}_${name}.png`)}
        alt={`${team}-${key}`}
        className="w-52"
      />
      <div className="my-2 text-center font-bold">{`${team}${
        isHead ? " 팀장" : ""
      }`}</div>
      <div className="text-center">{`${major} ${name}`}</div>
      <div className="text-center text-[#FF5C00]">{account}</div>
    </div>
  );
}

export default ProfileContainer;
