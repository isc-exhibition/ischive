/* 
AssignmentsContainer.tsx:
    A container that contains AssignmentButton
*/

import { AssignmentType } from "@/api/assignments";
import Image from "next/image";

function AssignmentButton({ assignment }: { assignment: AssignmentType }) {
  return (
    // div that contains thumbnail and assignment name
    <div className="box-border flex w-52 flex-col items-center text-center font-Pretendard">
      {/* thumbnail */}
      <div className="m-4 block h-48 w-48">
        <Image
          src={assignment.thumbnail}
          alt={`thumb-${assignment.id}`}
          width={0}
          height={0}
          sizes="100vw"
          className="h-48 w-48"
        />
      </div>
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
