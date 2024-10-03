import { Modal } from "antd";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function checkValidationImage(file?: File): boolean {
  if (file === undefined) {
    Modal.error({ title: "에러", content: "파일이 없습니다." });
    return false;
  }
  if (file?.size >= MAX_FILE_SIZE) {
    Modal.error({ content: "파일 용량 초과" });
    return false;
  }
  if (!file.type.includes("png") && !file.type.includes("jpeg")) {
    Modal.error({ content: "파일 확장자 에러" });
    return false;
  }
  return true;
}
