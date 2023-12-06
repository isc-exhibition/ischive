/* courses: an object that holds informations of courses

entire (Object): 전체 학기
  hci (Array): courses that belong to HCI Track
    name (string): name of the course
    courseId (number): id of the course
  mediaContents (Array)
  technology (Array)
  project: Array
*/

export type CoursesType = {
  [index: string]: TrackType;
  entire: TrackType;
  "2023-1": TrackType;
};

export type TrackType = {
  [index: string]: object;
  hci: Array<CourseType>;
  mediaContents: Array<CourseType>;
  technology: Array<CourseType>;
  project: Array<CourseType>;
};

export type CourseType = {
  [key: string]: any;
  name: string;
  courseId: number;
};

export const courses: CoursesType = {
  entire: {
    hci: [
      { name: "HCI 이론 및 실습", courseId: 1 },
      { name: "정보기술 실습", courseId: 2 },
      { name: "디지털 에쓰노그래피", courseId: 3 },
      { name: "사용자중심디자인", courseId: 4 },
      { name: "디자인 사고와 커뮤니케이션", courseId: 5 },
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
      { name: "인터넷과 지식기술", courseId: 17 },
      { name: "미래뉴스실습1", courseId: 27 },
      { name: "미래뉴스실습2", courseId: 28 },
    ],
    technology: [
      { name: "정보문화기술입문", courseId: 18 },
      { name: "정보구조", courseId: 19 },
      { name: "데이터 저널리즘", courseId: 20 },
      { name: "인터페이스프로그래밍", courseId: 21 },
      { name: "인터랙티브 미디어", courseId: 22 },
      { name: "웹프로그래밍개론", courseId: 23 },
      { name: "비주얼라이제이션", courseId: 24 },
    ],
    project: [
      { name: "산학연구실습", courseId: 25 },
      { name: "창의연구실습", courseId: 26 },
    ],
  },
  "2023-1": {
    hci: [
      { name: "HCI 이론 및 실습", courseId: 1 },
      { name: "정보기술 실습", courseId: 2 },
    ],
    mediaContents: [
      { name: "영상문화입문", courseId: 6 },
      { name: "디지털영상실습1", courseId: 7 },
      { name: "디지털영상실습2", courseId: 8 },
      { name: "디지털 음향의 이해", courseId: 9 },
      { name: "사운드 인터랙션", courseId: 10 },
    ],
    technology: [
      { name: "정보문화기술입문", courseId: 18 },
      { name: "정보구조", courseId: 19 },
    ],
    project: [{ name: "산학연구실습", courseId: 25 }],
  },
};
