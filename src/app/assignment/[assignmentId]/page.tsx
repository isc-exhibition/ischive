/* 
assignment/[assignmentId]/page.tsx:
    A server-side page for each assignment in /archiving/[courseId]
*/

import ArchivingAssignment from "./ArchivingAssignment";

export default function Page({ params }: { params: { assignmentId: string } }) {
  const { assignmentId } = params;
  return <ArchivingAssignment params={{ assignmentId: assignmentId }} />;
}
