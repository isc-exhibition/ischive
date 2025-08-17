"use client";

import { useState } from "react";
import { uploadToGoogleSheet } from "../actions/uploadToGoogleSheet";
import { uploadToGoogleDrive } from "../actions/uploadToGoogleDrive";

// next.js server action을 import 하여 form page에서 POST action을 처리합니다.
export default function FormPage() {
  // 썸네일을 관리하기 위한 useState
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  // 과제물 파일을 관리하기 위한 useState
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);

  // 기타 필요 기기를 위한 useState
  const [customDevice, setCustomDevice] = useState("");
  const [isCustomChecked, setIsCustomChecked] = useState(false);

  const handleCustomCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustomChecked(e.target.checked);
    if (!e.target.checked) {
      setCustomDevice(""); // 체크 해제 시 값 초기화
    }
  };

  // 썸네일을 선택할 때의 이벤트 핸들러
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  // 과제물 파일을 선택할 때의 이벤트 핸들러
  const handleAssignmentFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setAssignmentFile(e.target.files[0]);
    }
  };

  // 썸네일 업로드를 관리하는 함수. Form submit 시 실행
  const handleThumbnailUpload = async (formData: FormData) => {
    if (!thumbnail) {
      return;
    }
    formData.append("thumbnail", thumbnail);

    // Google Drive에 thumbnail 파일을 등록하고, 링크를 가져옵니다.
    try {
      const response = await uploadToGoogleDrive(formData, "thumbnail");
      if (response?.success) {
        return response?.link;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // 과제물 파일 업로드를 관리하는 함수. Form submit 시 실행
  const handleAssignmentFileUpload = async (formData: FormData) => {
    if (!assignmentFile) {
      return;
    }
    formData.append("assignmentFile", assignmentFile);

    // Google Drive에 assignmentFile 파일을 등록하고, 링크를 가져옵니다.
    try {
      const response = await uploadToGoogleDrive(formData, "assignmentFile");
      if (response?.success) {
        return response?.link;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // 참가자 관련 정보를 관리하기 위한 useState
  const [members, setMembers] = useState([
    { name: "", role: "", instagram: "", email: "" },
  ]);
  // 참가자 추가를 위한 로직
  const addMembers = () => {
    setMembers([...members, { name: "", role: "", instagram: "", email: "" }]);
  };
  // 참가자 제거를 위한 로직
  const removeMembers = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };
  // 참가자 정보 수정을 위한 로직
  const handleMemberChange = (
    index: number,
    field: "name" | "role" | "instagram" | "email",
    value: string,
  ) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  // server action 관련 코드
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // 제출 시간 추가
    const currentTime = new Date().toISOString();
    formData.append("submittedAt", currentTime);

    // 수강학기 추가(상수)
    formData.append("semester", "2024학년 2학기");

    // 썸네일 업로드
    const thumbnailLink = await handleThumbnailUpload(formData);
    if (thumbnailLink) {
      formData.append("thumbnailLink", thumbnailLink);
    }

    // 과제물 파일 업로드
    const assignmentFileLink = await handleAssignmentFileUpload(formData);
    if (assignmentFileLink) {
      formData.append("assignmentFileLink", assignmentFileLink);
    }

    // 수합용 구글 시트에 폼 데이터 등록
    try {
      const response = await uploadToGoogleSheet(formData);
      if (response?.success) {
        setFormStatus("success");
        alert("과제물 등록이 완료됐습니다.");
      } else {
        setFormStatus("fail");
      }
    } catch (error) {
      console.error(error);
      setFormStatus("Error occurred!");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-10">
      <h1 className="m-0 text-2xl tracking-tighter lg:text-5xl">
        2024-2 과제 수합용 페이지
      </h1>
      <p className="font-Pretendard">소개 텍스트 (WIP)</p>
      <form
        className="flex flex-col gap-5 font-Pretendard"
        onSubmit={handleSubmit}
      >
        <h2 className="m-0 text-xl lg:text-3xl">과제 정보 입력</h2>

        {/* 과목명 */}
        <label className="flex flex-col gap-2">
          <h3 className="m-0 text-lg lg:text-xl">과목명(필수)</h3>
          <select
            className="block rounded-sm border-2 border-black p-2"
            name="subject"
          >
            <option value="정보문화기술입문">정보문화기술입문</option>
            <option value="언론정보문화특강">언론정보문화특강</option>
            <option value="HCI 이론 및 실습">HCI 이론 및 실습</option>
            <option value="산학연구실습">산학연구실습</option>
            <option value="사용자중심디자인">사용자중심디자인</option>
            <option value="디지털영상실습2">디지털영상실습2</option>
            <option value="시리어스게임">시리어스게임</option>
            <option value="인터랙티브 스토리텔링">인터랙티브 스토리텔링</option>
            <option value="사운드인터랙션">사운드인터랙션</option>
            <option value="미래뉴스실습2">미래뉴스실습2</option>
            <option value="AI와 미디어">AI와 미디어</option>
            <option value="미디어 거버넌스">미디어 거버넌스</option>
            <option value="인터랙티브 미디어">인터랙티브 미디어</option>
            <option value="정보구조">정보구조</option>
          </select>
        </label>

        {/* 과제명 */}
        <label className="flex flex-col gap-2">
          <h3 className="m-0 text-lg lg:text-xl">과제명(필수)</h3>
          <input name="name" className="w-full rounded border p-2" required />
        </label>

        {/* 대표자 연락처 */}
        <label className="flex flex-col gap-2">
          <h3 className="m-0 text-lg lg:text-xl">대표 연락처(필수)</h3>
          <input
            placeholder="ex) 010-0000-0000"
            name="phone"
            className="w-full rounded border p-2"
            required
          />
        </label>

        {/* 대표자 이메일 */}
        <label className="flex flex-col gap-2">
          <h3 className="m-0 text-lg lg:text-xl">대표 이메일(필수)</h3>
          <input
            placeholder="ex) iscexhibition@gmail.com"
            name="email"
            type="email"
            className="w-full rounded border p-2"
            required
          />
        </label>

        {/* 과제 설명 */}
        <label className="flex flex-col gap-2">
          <h3 className="m-0 text-lg lg:text-xl">과제 설명(필수)</h3>
          <p>description (WIP)</p>
          <textarea name="description" className="w-full rounded border p-2" />
        </label>

        {/* 참가자 정보 */}
        <label className="flex flex-col gap-2">
          <h3 className="m-0 text-lg lg:text-xl">참가자 정보</h3>
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <th className="px-4 py-2">이름</th>
                <th className="px-4 py-2">역할</th>
                <th className="px-4 py-2">인스타그램</th>
                <th className="px-4 py-2">이메일</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full text-sm focus:outline-none"
                      name={`members[${index}][name]`}
                      type="text"
                      value={member.name}
                      onChange={(e) =>
                        handleMemberChange(index, "name", e.target.value)
                      }
                      placeholder="ex) 홍길동"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full text-sm focus:outline-none"
                      name={`members[${index}][role]`}
                      type="text"
                      value={member.role}
                      onChange={(e) =>
                        handleMemberChange(index, "role", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full text-sm focus:outline-none"
                      name={`members[${index}][instagram]`}
                      type="text"
                      value={member.instagram}
                      onChange={(e) =>
                        handleMemberChange(index, "instagram", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full text-sm focus:outline-none"
                      name={`members[${index}][email]`}
                      type="text"
                      value={member.email}
                      onChange={(e) =>
                        handleMemberChange(index, "email", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button type="button" onClick={() => removeMembers(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={addMembers}>
            Add members
          </button>
        </label>

        {/* 과제전 전시용 필요 기기 */}
        <div className="flex flex-col gap-2">
          <h3 className="m-0 text-lg lg:text-xl">과제전 전시용 필요 기기</h3>
          <p>과제전 전시에 있어서 필요한 모든 기기를 선택해주세요</p>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="devices" value="없음" id="none" />
            <label htmlFor="none">없음(포스터)</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="devices" value="아이맥" id="imac" />
            <label htmlFor="imac">아이맥</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="devices" value="마우스" id="mouse" />
            <label htmlFor="mouse">마우스</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="devices"
              value="키보드"
              id="keyboard"
            />
            <label htmlFor="keyboard">키보드</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="devices" value="웹캠" id="webcam" />
            <label htmlFor="webcam">웹캠</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="devices"
              value={customDevice}
              id="misc"
              checked={isCustomChecked}
              onChange={handleCustomCheck}
            />
            <label htmlFor="misc">기타</label>
            {isCustomChecked && (
              <input
                type="text"
                name="customDevice"
                value={customDevice}
                onChange={(e) => setCustomDevice(e.target.value)}
                placeholder="기기를 입력하세요"
                className="ml-2 p-1"
              />
            )}
          </div>
        </div>

        <h2 className="m-0 text-xl lg:text-3xl">과제 파일 및 썸네일 제출</h2>

        {/* 썸네일 업로드 */}
        <label className="flex flex-col gap-2">
          <h3 className="m-0 text-lg lg:text-xl">썸네일 업로드(필수)</h3>
          <input
            name="thumbnail"
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleThumbnailChange}
            required
          />
        </label>

        {/* 과제물 파일 업로드 */}
        <label className="flex flex-col gap-2">
          <h3 className="m-0 text-lg lg:text-xl">과제물 파일 업로드</h3>
          <input
            name="assignmentFile"
            type="file"
            accept=".png,.jpg,.jpeg,.pdf,.mp4"
            onChange={handleAssignmentFileChange}
          />
        </label>

        {/* 과제물 링크 업로드 */}
        <label className="flex flex-col gap-2">
          <h3 className="m-0 text-lg lg:text-xl">과제 링크</h3>
          <input name="assignmentLink" className="w-full rounded border p-2" />
        </label>

        {/* Submit 버튼 */}
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Submit
        </button>
      </form>
      {formStatus && <p className="mt-4">{formStatus}</p>}
    </div>
  );
}
