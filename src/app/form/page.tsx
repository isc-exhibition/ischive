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
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <h2>과제 정보 입력</h2>

        <label className="mb-2 block">
          과목명
          <select className="block" name="subject">
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

        <label className="mb-2 block">
          과제명
          <input name="name" className="w-full rounded border p-2" required />
        </label>

        <label className="mb-2 block">
          대표 연락처
          <input
            placeholder="ex) 010-0000-0000"
            name="phone"
            className="w-full rounded border p-2"
            required
          />
        </label>

        <label className="mb-2 block">
          대표 이메일
          <input
            placeholder="ex) iscexhibition@gmail.com"
            name="email"
            type="email"
            className="w-full rounded border p-2"
            required
          />
        </label>

        <label className="mb-2 block">
          과제 설명 (공백 포함 200자[소형] / 100자[초소형] 내외) <br />{" "}
          자신/자신의 팀 과제를 설명해주세요! 과제전의 메인 테마와 어울리게
          설명해주시면 더 좋아요📦 <br />
          과제전의 메인 테마: ⟪이공이사 정문이사⟫ (소형 판넬 공백 포함 200자,
          줄바꿈 X)
          <textarea name="description" className="w-full rounded border p-2" />
        </label>

        {/* 참가자 정보 */}
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>역할</th>
              <th>인스타그램</th>
              <th>이메일</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>
                  <input
                    name={`members[${index}][name]`}
                    type="text"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    name={`members[${index}][role]`}
                    type="text"
                    value={member.role}
                    onChange={(e) =>
                      handleMemberChange(index, "role", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    name={`members[${index}][instagram]`}
                    type="text"
                    value={member.instagram}
                    onChange={(e) =>
                      handleMemberChange(index, "instagram", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    name={`members[${index}][email]`}
                    type="text"
                    value={member.email}
                    onChange={(e) =>
                      handleMemberChange(index, "email", e.target.value)
                    }
                  />
                </td>
                <td>
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

        {/* 썸네일 업로드 */}
        <label className="mb-4 block">
          <h2>썸네일 업로드</h2>
          <input
            name="thumbnail"
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleThumbnailChange}
            required
          />
        </label>

        {/* 과제물 파일 업로드 */}
        <label className="mb-4 block">
          <h2>과제물 파일 업로드</h2>
          <input
            name="assignmentFile"
            type="file"
            accept=".png,.jpg,.jpeg,.pdf,.mp4"
            onChange={handleAssignmentFileChange}
          />
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

      {/* <div>
        <h1>파일 업로드</h1>
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.pdf,.mp4"
          onChange={handleFileChange}
        />
        <button onClick={handleFileUpload}>파일 업로드</button>
        {uploadStatus && <p>{uploadStatus}</p>}
        {thumbnailLink && (
          <p>
            썸네일 링크:{" "}
            <a href={thumbnailLink} target="_blank" rel="noopener noreferrer">
              {thumbnailLink}
            </a>
          </p>
        )}
      </div> */}
    </div>
  );
}
