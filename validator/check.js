import fs from "fs";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config({ path: "../.env.local" });

// 사용법.
// package.json에   "type": "module" 을 추가해주세요.
// 루트 디렉토리의 .env.local 파일을 만들고, TEST_GOOGLE_SHEET_ID에 해당 학기 구글 폼 시트 ID를 입력합니다.
// 마찬가지로 .env.local의 NEXT_PUBLIC_GOOGLE_API_KEY에 구글 API 키를 입력합니다.
// 아래 sheetName 변수에 해당 시트 이름을 입력합니다.

// 이후 node check.js 명령어로 실행합니다.

// 동일 디렉토리에 resultFileName 형식으로 결과가 저장됩니다.

const sheetName = "응답 사본(for DB export)";
const resultFileName = "invalid_form.json";

export async function validateAssignments() {
  // Google Sheets API URL 및 API 키
  const sheetId = process.env.TEST_GOOGLE_SHEET_ID;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  // Google Sheets API로부터 데이터 가져오기
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`,
  );
  const json = await response.json();
  const values = json.values;

  let invalidRows = [];

  // 참여자 이름이 8번, 역할이 9번, 인스타그램 아이디가 10번, 이메일이 11번 열에 위치
  values.forEach((value, index) => {
    if (index === 0) return; // 첫 번째 행은 헤더이므로 무시

    if (value.length < 12) {
      invalidRows.push([
        index + 1,
        value[4],
        {
          message: "행의 길이가 너무 짧습니다.",
        },
      ]);
      return;
    }

    // if (index == 35) {
    //   console.log(value);
    // }

    // if (value.length < 14) {
    //   invalidRows.push([
    //     index + 1,
    //     value[4],
    //     {
    //       message: "썸네일이 없습니다.",
    //     },
    //   ]);
    //   return;
    // }

    const participantNames = value[8].replace(/\s/g, "");
    const participantRoles = value[9].replace(/\s/g, "");
    const participantInstagrams = value[10].replace(/\s/g, "");
    const participantEmails = value[11].replace(/\s/g, "");
    const thumbnail = value[13]?.replace(/\s/g, "");

    const nameArray = participantNames?.split(",");
    const roleArray = participantRoles?.split(",");
    const instaArray = participantInstagrams?.split(",");
    const emailArray = participantEmails?.split(",");

    // 각 조원 수와 역할, 인스타그램, 이메일 개수가 일치하는지 확인
    const roleLengthValid = nameArray.length == roleArray.length;
    const instaLengthValid = nameArray.length == instaArray.length;
    const emailLengthValid = nameArray.length == emailArray.length;

    const allLengthValid =
      roleLengthValid && instaLengthValid && emailLengthValid;

    const nameValid = nameArray.every((name) => name);

    // 역할, 인스타그램, 이메일이 모두 비어있는 경우도 허용. 대충 콤마로 구분하고 ,,준석, 이렇게 되어도.
    const roleValid = roleArray.every((role) => role || role === "");
    const instagramValid = instaArray.every(
      (insta) => insta.startsWith("@") || insta === "" || insta === "-",
    );
    const emailValid = emailArray.every((email) => email || email === "");

    const thumbnailValid = thumbnail && thumbnail.startsWith("https://");

    const reasons = {};

    if (!thumbnailValid) {
      reasons.이상한썸네일 = {
        reason: "썸네일이 없거나, 이상한 형식이에요",
        data: thumbnail,
      };
    }

    if (!roleLengthValid) {
      reasons.이상한역할 = {
        reason: "member 숫자와 안맞아요",
        data: participantRoles,
      };
    } else if (!roleValid) {
      reasons.이상한역할 = {
        reason: "이상한 형식이에요",
        data: participantRoles,
      };
    }

    if (!instaLengthValid) {
      reasons.이상한인스타 = {
        reason: "member 숫자와 안맞아요",
        data: participantInstagrams,
      };
    } else if (!instagramValid) {
      reasons.이상한인스타 = {
        reason: "이상한 형식이에요",
        data: participantInstagrams,
      };
    }

    if (!emailLengthValid) {
      reasons.이상한이메일 = {
        reason: "member 숫자와 안맞아요",
        data: participantEmails,
      };
    } else if (!emailValid) {
      reasons.이상한이메일 = {
        reason: "이상한 형식이에요",
        data: participantEmails,
      };
    }

    if (
      !thumbnailValid ||
      !allLengthValid ||
      !nameValid ||
      !instagramValid ||
      !emailValid ||
      !roleValid
    ) {
      invalidRows.push([
        index + 1,
        value[4],
        {
          allMembers: nameArray,
          ...(nameValid
            ? {}
            : {
                name: {
                  reason: "이름이 유효하지 않아요",
                  data: participantNames,
                },
              }),
          ...reasons,
        },
      ]);
    }

    return invalidRows;
  });

  return invalidRows;
}

validateAssignments().then((invalidRows) => {
  if (invalidRows.length > 0) {
    // console.log(JSON.stringify(invalidRows, null, 2));
    console.log(`총 ${invalidRows.length}개의 행이 유효하지 않습니다.`);
    fs.writeFileSync(resultFileName, JSON.stringify(invalidRows, null, 2));
  } else {
    console.log("모든 행이 유효합니다.");
  }
});
