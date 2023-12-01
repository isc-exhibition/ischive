/* 
about/page.tsx:
  Describes /about
*/

import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import HomeLogo from "../../assets/img/home.png";
import IgLogo from "../../assets/img/instagram.png";

export default function About() {
  return (
    <Layout>
      {/* h1: GREETINGS */}
      <h1>GREETINGS</h1>
      {/* div: container for greetings message */}
      <div className="border-b-2 border-t-2 border-solid border-black py-9">
        <div className="px-12 text-lg">
          <p>
            누군가로 하여금 일하게 만드는 동력은 여러 종류가 있겠지만, 우리
            정보문화학 구성원들에게 가장 큰 원동력은{" "}
            <strong>새로운 시도를 통한 문제 해결</strong>이 아닐까 합니다.
          </p>
          <p>&nbsp;</p>
          <p>
            2002년 기초학문과 이론을 중시하던 서울대학교에 IT 실무와 융합교육을
            제공할 수 있는 연합전공으로서 정보문화학이 탄생했습니다. 꼭 10년이
            지난 2013년, 우리의 한 학기를 쏟아낸 성과를 전시하고 홍보하는
            과제전을 학생들 스스로 출범시켜 지금까지 이어오고 있습니다.
          </p>
          <p>&nbsp;</p>
          <p>
            그로부터 또 다른 10년이 지나 정보문화학 연합전공 발족 20년을 갓 넘긴
            올해, 온라인 과제 아카이빙이라는 기점을 만들게 되었습니다. 인터넷이
            새로운 삶의 공간이 된 오늘날, 학생들의 피땀눈물을 감상하는 방식이
            서울대학교 64동에 방문하는 선택지뿐이라는 것은 그 자체로 문제라는
            생각이었습니다.
          </p>
          <p>&nbsp;</p>
          <p>
            더 지속가능하게, 더 쉽게 접근할 수 있는 우리의 흔적과 결실을 여기에
            담습니다.
          </p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>2023년 6월 19일 정문랜드 과제전에 부쳐</p>
          <p>
            <strong>연합전공 정보문화학 온라인 과제 아카이빙 사이트 TF</strong>
          </p>
        </div>
        <div className="flex flex-row justify-end">
          <Image src={HomeLogo} alt="home-logo" className="mr-12 w-10" />
          <Image src={IgLogo} alt="ig-logo" className="mr-14 w-10" />
        </div>
      </div>
      {/* h1: CREDITS */}
      <h1 className="text-right">CREDITS</h1>
      {/* div & h2: 기획팀 */}
      <div className="border-t-2 border-solid border-black">
        <h2>기획팀</h2>
      </div>
      {/* div: profiles */}
      <div className="flex flex-row flex-wrap border-t-2 border-solid border-black">
        <Image
          src="../../assets/img/profile/기획팀_이예은.png"
          alt="기획팀-1"
          width={300}
          height={300}
        ></Image>
      </div>
    </Layout>
  );
}
