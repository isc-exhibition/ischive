/* 
AssignmentsContainer.tsx:
    A container that contains AssignmentButton
*/

import { AssignmentType } from "@/api/assignments";
import Image from "next/image";

function AssignmentButton({ assignment }: { assignment: AssignmentType }) {
  return (
    // div that contains thumbnail and assignment name
    <div className="m-3 box-border flex w-32 flex-col items-center text-center font-Pretendard md:m-4 md:w-40">
      {/* thumbnail */}
      <div className="relative mb-1 h-32 w-32 md:mb-2 md:h-40 md:w-40">
        <Image
          src={assignment.thumbnail}
          alt={`thumb-${assignment.id}`}
          width={10000}
          height={10000}
          sizes="100vw"
          className="mb-1 h-32 w-32 md:mb-2 md:h-40 md:w-40"
        />
        {/* a component that appears when hovered on thumbnail */}
        <p className="absolute inset-0 flex items-center bg-gradient-to-b from-black to-gray-500 p-2 text-white opacity-0 hover:opacity-90">
          {assignment.members}
        </p>
      </div>
      {/* assignment name */}
      <p className="text-sm md:text-base">{assignment.assignmentName}</p>
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
