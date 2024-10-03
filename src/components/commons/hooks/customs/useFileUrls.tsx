import { ChangeEvent, useState } from "react";

interface IFileUrls {
  fileUrl: string[];
  uploadUrl: File[];
  onChangeFileUrls: (
    index: number
  ) => (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function useFileUrls(): IFileUrls {
  const [fileUrl, setFileUrl] = useState<string[]>(["", "", ""]);
  const [uploadUrl, setUploadUrl] = useState<File[]>([]);
  // const [uploadUrl, setUploadUrl] = useState<string[]>(["","",""]);

  const onChangeFileUrls =
    (index: number) =>
    async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const file = event.target.files?.[0];
      if (file === undefined) return;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          const tempFile = [...fileUrl];
          tempFile[index] = event.target?.result;
          setFileUrl(tempFile);

          const tempUpload = [...uploadUrl];
          tempUpload[index] = file;
          setUploadUrl(tempUpload);
        }
      };
    };

  return { fileUrl, uploadUrl, onChangeFileUrls };
}
