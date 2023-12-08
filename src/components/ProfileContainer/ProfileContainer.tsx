/* 
ProfileContainer.tsx:
  A container that contains profile image, 
  team, major, name, and instagram account
*/

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
      {/* profile image */}
      <div className="mx-5 w-40">
        <Image
          src={`/assets/img/profile/${team}_${name}.png`}
          alt={`${team}-${id}`}
          width={10000}
          height={10000}
        />
      </div>
      {/* team */}
      <div className="my-2 text-center font-Pretendard font-bold">{`${team}${
        isHead ? " 팀장" : ""
      }`}</div>
      {/* major and name */}
      <div className="text-center font-Pretendard">{`${major} ${name}`}</div>
      {/* instagram or email account */}
      <div className="text-center font-Pretendard text-[#FF5C00]">
        {account}
      </div>
    </div>
  );
}
