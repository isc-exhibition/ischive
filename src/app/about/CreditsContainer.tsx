import ProfileContainer from "./ProfileContainer";

interface MembersProps {
  team: string;
  isHead: boolean;
  major: string;
  name: string;
  account: string;
  key: number;
}

export default function CreditsContainer({
  members,
}: {
  members: Array<MembersProps>;
}) {
  /* div & h2: 개발팀 */
  <div className="text border-t-2 border-solid border-black">
    <h2>개발팀</h2>
  </div>;

  /* div: profiles */
  <div className="border-t-2 border-solid border-black">
    <div className="mx-5 flex flex-row flex-wrap">
      {members.map((item) => (
        <ProfileContainer
          team={item.team}
          isHead={item.isHead}
          major={item.major}
          name={item.name}
          account={item.account}
          key={item.key}
        />
      ))}
    </div>
  </div>;
}
