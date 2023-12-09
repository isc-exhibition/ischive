import ArchivingCourse from "./ArchivingCourse";

export default function Page({ params }: { params: { courseId: string } }) {
  return <ArchivingCourse params={{ courseId: params.courseId }} />;
}
