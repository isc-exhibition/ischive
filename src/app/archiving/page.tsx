/* 
archiving/page.tsx:
  Describes /archiving
  Shows all tracks and courses
*/

import Layout from "@/components/Layout/Layout";
import SemesterSelect from "@/components/SemesterSelect/SemesterSelect";

export default async function Page() {
  return (
    <Layout>
      {/* h1: ROADMAP */}
      <h1>R0ADMAP</h1>
      {/* SemesterSelect: dropdown select box */}
      <div className="border-t-2 border-solid border-black">
        <SemesterSelect />
      </div>
      {/* div: container for HCI tracks and courses */}
      <div className="border-t-2 border-solid border-black px-10 py-10">
        <h4># HCI Track</h4>
      </div>
      {/* div: container for Media & Contents tracks and courses */}
      <div className="px-10 py-10">
        <h4># Media & Contents Track</h4>
      </div>
      {/* div: container for Technology tracks and courses */}
      <div className="px-10 py-10">
        <h4># Technology Track</h4>
      </div>
      {/* div: container for Project tracks and courses */}
      <div className="px-10 py-10">
        <h4># Project</h4>
      </div>
    </Layout>
  );
}
