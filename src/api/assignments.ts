/* 
assignments.ts:
    An api that fetches course and assignment infos from Google Sheets
*/

// CourseInfoType: a type for courseInfo
export type CourseInfoType = {
  [index: string]: any;
  courseId: number;
  track: string;
  name: string;
  professors: string[];
};

// AssignmentType: a type for assignment
export type AssignmentType = {
  [index: string]: any;
  year: number;
  semester: number;
  courseName: string;
  assignmentName: string;
  members: string;
  thumbnail: string;
  id: string;
};

// fetchCourseInfo: fetch courseInfo by courseId
export async function fetchCourseInfo(courseId: number) {
  // Sheet 'CourseInfoSheet' is holding infos about courses
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${
      process.env.GOOGLE_SHEET_ID
    }/values/CourseInfoSheet!${courseId + 1}:${courseId + 1}?key=${
      process.env.GOOGLE_API_KEY
    }`,
  );
  const json = await response.json();
  const values = await json.values[0];

  const courseInfo: CourseInfoType = {
    courseId: values[0],
    track: values[1],
    name: values[2],
    professors: values.slice(3),
  };

  return courseInfo;
}

// fetchAssignments: fetch assignments by name
export async function fetchAssignments(courseName: string) {
  // Sheet 'AssignmentsSheet' is holding infos about assignments
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}/values/AssignmentsSheet?key=${process.env.GOOGLE_API_KEY}`,
  );
  const json = await response.json();
  const values = await json.values;

  let assignments: AssignmentType[] = [];

  // Save assignments of the course into assignments
  values.forEach((value: any) => {
    if (value[2] === courseName) {
      const assignment: AssignmentType = {
        year: parseInt(value[1].slice(0, 4)),
        semester: parseInt(value[1][8]),
        courseName: courseName,
        assignmentName: value[3],
        members: value[7],
        thumbnail: value[6],
        id: value[13],
      };

      assignments.push(assignment);
    }
  });

  return assignments;
}
