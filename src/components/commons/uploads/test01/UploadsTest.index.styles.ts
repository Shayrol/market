import styled from "@emotion/styled";

export const UploadsFileHidden = styled.input`
  display: none;
`;

export const Img = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  border: 5px dashed #bec0c4;
  outline: none;
  cursor: pointer;

  :hover {
    filter: brightness(0.8);
  }
`;

export const UploadsFileBtn = styled.button`
  width: 100%;
  height: 200px;
  outline: none;
  background-color: transparent;
  border: 5px dashed #bec0c4;
  cursor: pointer;
`;

export const UploadsFileBtnImg = styled.img`
  width: 50px;
  height: 50px;
  :hover {
    filter: brightness(0.8);
  }
`;

export const UploadFileUrlWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-around;
  width: 380px;
  height: 200px;
`;
