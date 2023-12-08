/* 
AssignmentsContainer.tsx:
    A container that contains AssignmentButton
*/

import { AssignmentType } from "@/api/assignments";
import Image from "next/image";

function AssignmentButton({ assignment }: { assignment: AssignmentType }) {
  return (
    // div that contains thumbnail and assignment name
    <div className="m-3 box-border flex w-32 flex-col items-center text-center font-Pretendard text-sm md:m-4 md:w-40 md:text-base">
      {/* thumbnail */}
      <Image
        src={assignment.thumbnail}
        alt={`thumb-${assignment.id}`}
        width={0}
        height={0}
        sizes="100vw"
        className="mb-1 w-32 md:mb-2 md:h-40 md:w-40"
      />
      {/* assignment name */}
      <p>{assignment.assignmentName}</p>
    </div>
  );
}

export default function AssignmentsContainer({
  assignments,
}: {
  assignments: AssignmentType[];
}) {
  return (
    <div className="flex flex-row flex-wrap">
      {assignments.map((assignment) => (
        <AssignmentButton assignment={assignment} key={assignment.id} />
      ))}
    </div>
  );
}
