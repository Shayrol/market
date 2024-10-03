import { ChangeEvent, useRef } from "react";
import * as S from "./UploadsTest.index.styles";

interface IUploadsFile {
  key: string;
  fileUrl: string;
  uploadUrl: File[];
  index: number;
  dataImg: any;
  isEdit: boolean;
  onChangeFileUrls: (
    index: number
  ) => (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function UploadsFile(props: IUploadsFile): JSX.Element {
  const fileRef = useRef<HTMLInputElement>(null);
  const onClickUpload = (): void => {
    fileRef.current?.click();
  };

  return (
    <S.UploadFileUrlWrap>
      {props.fileUrl !== "" || props.dataImg?.[props.index] ? (
        <S.Img
          src={
            props.fileUrl ||
            `http://storage.googleapis.com/${props.dataImg[props.index]}`
          }
          onClick={onClickUpload}
        />
      ) : (
        <S.UploadsFileBtn onClick={onClickUpload} type="button">
          <S.UploadsFileBtnImg src="/images/board/write/image_icon.png" />
        </S.UploadsFileBtn>
      )}
      <S.UploadsFileHidden
        type="file"
        ref={fileRef}
        onChange={props.onChangeFileUrls(props.index)}
      />
    </S.UploadFileUrlWrap>
  );
}
