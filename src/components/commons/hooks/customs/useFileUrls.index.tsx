// 실전에 적용할 컴포넌트
import { ChangeEvent, useState } from "react";

interface IFileUrls {
  imageUrls: string[];
  files: File[];
  onChangeImageUrls: (
    fileUrl: string,
    index: number
  ) => (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function useFileUrlsIndex(): IFileUrls {
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [files, setFiles] = useState<File[]>([]);

  const onChangeImageUrls =
    (fileUrl: string, index: number) =>
    async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const file = event.currentTarget.files?.[0];

      if (file === undefined) return;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          // 브라우저에서 이미지 Url 생성으로 해당 이미지 Url을 state에 저장
          // 그 후 화면에 보여질 컴포넌트에 해당 temUrls을 뿌림
          const tempUrls = [...imageUrls];
          tempUrls[index] = event.target?.result;
          setImageUrls(tempUrls);

          // 이미지를 DB에 저장을 하기위해 API 요청에 담을 값 즉 이미지 file을 state에 저장
          // 이는 input의 file을 선택한 이미지에 대한 정보를 갖고 있어 해당 이미지를 가지고
          // UploadFile에 image 값을 넣어 API 요청을 한다.
          const tempFiles = [...files];
          tempFiles[index] = file;
          setFiles(tempFiles);
        }
      };
    };

  return { imageUrls, files, onChangeImageUrls };
}
// imageUrls: 브라우저에 띄워질 이미지 (스토리지에 저장X)
// files: 이미지 API요청 값에 들어갈 이미지
// onChangeImageUrls: 해당 onChange 이벤트에 들어갈 함수

// 🎈2024.04.18
// 이미지 선택에 대한 이해와 state 자장을 한 상태
// 해야할 것:
//   1. 이미지를 띄울 input 요소가 있는 컴포넌트 필요
//   2. 등록 클릭 시 이미지 먼저 스토리지에 저장 API 요청을 하고
//      스토리지에서 이미지 주소를 받으면 createBoard API 요청을 해야 함
//   3. BoardDetail의 댓글과 별점 기능 추가 해야하고
//   4. 게시글, 게시글 댓글 삭제, 수정 기능 해야 함
