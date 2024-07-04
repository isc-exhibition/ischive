/* 
api/courses.ts:
  An api(?) that holds data for courses
  A course contains its name and courseId (Please refer to CourseType)
  courseId is specified according to the row number in Google Sheets
  
  This file must be hard-coded and modified manually every semester

The things that must be updated manually every semester:
  Coursestype,
  courses
  SemesterName
*/

export const getSemesterName = (semester: CoursesKey) => {
  return SemesterName[semester];
};

// 각 학기 이름을 자유롭게 설정할 수 있는 enum 역할을 수행.
// SemesterName key should be the same as CoursesKey
const SemesterName: Record<CoursesKey, string> = {
  entire: "전체 학기" as const,
  "2024-1": "2024-1" as const,
  "2023-2": "2023-2" as const,
  "2023-1": "2023-1" as const,
  "2022-2": "2022-2" as const,
  "2022-1": "2022-1" as const,
};

export type CoursesKey = keyof CoursesType;

// CoursesType: a type for 'courses'
export type CoursesType = {
  entire: TrackType;
  "2024-1": TrackType;
  "2023-2": TrackType;
  "2023-1": TrackType;
  "2022-2": TrackType;
  "2022-1": TrackType;
};

// TrackType: a type for tracks (hci: [], mediaContents: [], etc)
export type TrackType = {
  [index: string]: Array<CourseType>;
  hci: Array<CourseType>;
  mediaContents: Array<CourseType>;
  technology: Array<CourseType>;
  project: Array<CourseType>;
};

// CourseType: a type for a course ({name: ..., courseId: ...})
export type CourseType = {
  [key: string]: any;
  name: string;
  courseId: number;
};

/* courses: an object that holds informations of courses

entire (Object): 전체 학기
  hci (Array): courses that belong to HCI Track
    name (string): name of the course
    courseId (number): id of the course
  mediaContents (Array)
    ...
  technology (Array)
    ...
  project: Array
    ...
*/
export const courses: CoursesType = {
  entire: {
    hci: [
      { name: "HCI 이론 및 실습", courseId: 1 },
      { name: "정보기술 실습", courseId: 2 },
      { name: "디지털 에쓰노그래피", courseId: 3 },
      { name: "사용자중심디자인", courseId: 4 },
      { name: "디자인 사고와 커뮤니케이션", courseId: 5 },
      { name: "커뮤니케이션 질적방법론", courseId: 30 },
    ],
    mediaContents: [
      { name: "영상문화입문", courseId: 6 },
      { name: "디지털영상실습1", courseId: 7 },
      { name: "디지털영상실습2", courseId: 8 },
      { name: "디지털 음향의 이해", courseId: 9 },
      { name: "사운드 인터랙션", courseId: 10 },
      { name: "디지털 미디어의 이해", courseId: 11 },
      { name: "인터랙티브 스토리텔링", courseId: 12 },
      { name: "게임의 이해", courseId: 13 },
      { name: "시리어스 게임", courseId: 14 },
      { name: "가상현실입문", courseId: 15 },
      { name: "문화컨텐츠의 이해", courseId: 16 },
      { name: "미래뉴스실습1", courseId: 27 },
      { name: "미래뉴스실습2", courseId: 28 },
      { name: "정보문화세미나", courseId: 29 },
    ],
    technology: [
      { name: "정보문화기술입문", courseId: 18 },
      { name: "정보구조", courseId: 19 },
      { name: "데이터 저널리즘", courseId: 20 },
      { name: "인터랙티브 미디어", courseId: 22 },
      { name: "웹프로그래밍개론", courseId: 23 },
      { name: "비주얼라이제이션", courseId: 24 },
    ],
    project: [
      { name: "산학연구실습", courseId: 25 },
      { name: "창의연구실습", courseId: 26 },
    ],
  },
  "2024-1": {
    hci: [
      { name: "HCI 이론 및 실습", courseId: 1 },
      { name: "디지털 에쓰노그래피", courseId: 3 },
      { name: "디자인 사고와 커뮤니케이션", courseId: 5 },
    ],
    mediaContents: [
      { name: "영상문화입문", courseId: 6 },
      { name: "디지털영상실습1", courseId: 7 },
      { name: "디지털 음향의 이해", courseId: 9 },
      { name: "디지털 미디어의 이해", courseId: 11 },
      { name: "게임의 이해", courseId: 13 },
      { name: "문화컨텐츠의 이해", courseId: 16 },
      { name: "미래뉴스실습1", courseId: 27 },
    ],
    technology: [
      { name: "정보문화기술입문", courseId: 18 },
      { name: "웹프로그래밍개론", courseId: 23 },
      { name: "비주얼라이제이션", courseId: 24 },
    ],
    project: [{ name: "창의연구실습", courseId: 26 }],
  },
  "2023-2": {
    hci: [
      { name: "HCI 이론 및 실습", courseId: 1 },
      { name: "사용자중심디자인", courseId: 4 },
      { name: "커뮤니케이션 질적방법론", courseId: 30 },
    ],
    mediaContents: [
      { name: "디지털영상실습2", courseId: 8 },
      { name: "사운드 인터랙션", courseId: 10 },
      { name: "인터랙티브 스토리텔링", courseId: 12 },
      { name: "시리어스 게임", courseId: 14 },
      { name: "가상현실입문", courseId: 15 },
      { name: "미래뉴스실습2", courseId: 28 },
      { name: "정보문화세미나", courseId: 29 },
    ],
    technology: [{ name: "정보문화기술입문", courseId: 18 }],
    project: [{ name: "산학연구실습", courseId: 25 }],
  },
  "2023-1": {
    hci: [
      { name: "HCI 이론 및 실습", courseId: 1 },
      { name: "디지털 에쓰노그래피", courseId: 3 },
      { name: "디자인 사고와 커뮤니케이션", courseId: 5 },
    ],
    mediaContents: [
      { name: "영상문화입문", courseId: 6 },
      { name: "디지털영상실습1", courseId: 7 },
      { name: "디지털 음향의 이해", courseId: 9 },
      { name: "디지털 미디어의 이해", courseId: 11 },
      { name: "게임의 이해", courseId: 13 },
      { name: "문화컨텐츠의 이해", courseId: 16 },
      { name: "미래뉴스실습1", courseId: 27 },
    ],
    technology: [
      { name: "정보문화기술입문", courseId: 18 },
      { name: "웹프로그래밍개론", courseId: 23 },
      { name: "비주얼라이제이션", courseId: 24 },
    ],
    project: [{ name: "창의연구실습", courseId: 26 }],
  },
  "2022-2": {
    hci: [
      { name: "HCI 이론 및 실습", courseId: 1 },
      { name: "사용자중심디자인", courseId: 4 },
    ],
    mediaContents: [
      { name: "디지털영상실습2", courseId: 8 },
      { name: "사운드 인터랙션", courseId: 10 },
      { name: "인터랙티브 스토리텔링", courseId: 12 },
      { name: "시리어스 게임", courseId: 14 },
      { name: "가상현실입문", courseId: 15 },
      { name: "미래뉴스실습2", courseId: 28 },
    ],
    technology: [
      { name: "정보문화기술입문", courseId: 18 },
      { name: "정보구조", courseId: 19 },
      { name: "데이터 저널리즘", courseId: 20 },
      { name: "인터랙티브 미디어", courseId: 22 },
    ],
    project: [{ name: "산학연구실습", courseId: 25 }],
  },
  "2022-1": {
    hci: [
      { name: "HCI 이론 및 실습", courseId: 1 },
      { name: "정보기술 실습", courseId: 2 },
      { name: "디지털 에쓰노그래피", courseId: 3 },
    ],
    mediaContents: [
      { name: "영상문화입문", courseId: 6 },
      { name: "디지털영상실습1", courseId: 7 },
      { name: "디지털 음향의 이해", courseId: 9 },
      { name: "디지털 미디어의 이해", courseId: 11 },
      { name: "게임의 이해", courseId: 13 },
    ],
    technology: [
      { name: "정보문화기술입문", courseId: 18 },
      { name: "비주얼라이제이션", courseId: 24 },
    ],
    project: [{ name: "창의연구실습", courseId: 26 }],
  },
};
