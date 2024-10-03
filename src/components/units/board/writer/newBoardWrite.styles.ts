import "react-quill/dist/quill.snow.css";
import styled from "@emotion/styled";
// 토스 색상코드: #0064ff
// 토스 색상코드 회색: #bec0c4

export const Wrap = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 60px 0;
  padding: 20px;
  border: 2px solid #0064ff;
  border-radius: 20px;
  width: 1200px;
`;

export const BoardTitle = styled.label`
  font-size: 25px;
  font-weight: 600;
  color: #0064ff;
  margin-bottom: 30px;
`;

export const UserWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0 40px;
  width: 100%;
`;

export const UserInputWrap = styled.div`
  border-radius: 20px;
  position: relative;
  width: 500px;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
`;

export const Image = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

export const UserInput = styled.input`
  border: 2px solid #bec0c4;
  border-radius: 10px;
  outline: none;
  height: 35px;
  width: 100%;
  font-size: 18px;
  padding-top: 2px;
  padding-left: 15px;
  :focus {
    caret-color: transparent;
    border: 2px solid #0064ff;
  }
`;

export const UserError = styled.p`
  position: absolute;
  color: red;
  font-size: 14px;
  top: 40px;
  left: 65px;
`;

// Title

export const TitleWrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
`;

export const TitleInput = styled.input`
  border: 2px solid #bec0c4;
  border-radius: 10px;
  outline: none;
  height: 35px;
  width: 100%;
  font-size: 18px;
  padding-top: 2px;
  padding-left: 15px;
  :focus {
    caret-color: transparent;
    border: 2px solid #0064ff;
  }
`;

export const TitleError = styled.p`
  position: absolute;
  color: red;
  font-size: 14px;
  top: 40px;
  left: 10px;
`;

export const ContentsWrap = styled.div`
  width: 100%;
  height: 280px;
  position: relative;
  padding-bottom: 80px;
`;

export const ContentsError = styled.p`
  position: absolute;
  color: red;
  font-size: 14px;
  bottom: 10px;
  left: 10px;
`;

export const AddressCodeWrap = styled.div``;

export const AddressWrap = styled.div`
  border: 1px solid #bec0c4;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

export const AddressBtn = styled.button`
  background-color: #fff;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #0064ff;
  width: 15%;
  height: 35px;
  /* padding: 10px; */
  font-size: 18px;
  color: white;
  margin-left: 10px;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    background-color: #e2e2e2;
    color: black;
  }
`;

export const AddressCode = styled.input`
  outline: none;
  width: 65px;
  height: 35px;
  border: none;
  border-bottom: 2px solid #bec0c4;
  padding-top: 2px;
  padding-left: 10px;
  font-size: 18px;
`;
export const Address = styled.input`
  outline: none;
  width: 300px;
  height: 35px;
  border: none;
  border-bottom: 2px solid #bec0c4;
  padding-top: 2px;
  padding-left: 10px;
  font-size: 18px;
`;
export const AddressDetail = styled.input`
  outline: none;
  width: 300px;
  height: 35px;
  border: none;
  border-bottom: 2px solid #bec0c4;
  padding-top: 2px;
  padding-left: 10px;
  font-size: 18px;

  :focus {
    caret-color: transparent;
    border-bottom: 2px solid #0064ff;
  }
`;

// youtube url

export const YoutubeWrap = styled.div`
  border-radius: 10px;
  margin: 20px 0;
  width: 100%;
`;

export const Youtube = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-right: 10px;
  padding: 0 5px;
  width: 85px;
  height: 20px;
  overflow: hidden;
`;

export const YoutubeLogo = styled.img`
  width: 100px;
  height: 70px;
`;

export const YoutubeUrl = styled.input`
  border: 2px solid #bec0c4;
  border-radius: 10px;
  outline: none;
  height: 35px;
  width: 100%;
  font-size: 18px;
  margin-top: 10px;
  padding-top: 2px;
  padding-left: 15px;
  :focus {
    caret-color: transparent;
    border: 2px solid #0064ff;
  }
`;

// 등록하기 Btn

export const SubmitBtnWrap = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  margin-top: 20px;
`;

export const SubmitBtn = styled.button`
  background-color: #0064ff;
  width: 100%;
  height: 60px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  font-size: 18px;
  color: white;

  :hover {
    background-color: #e2e2e2;
    color: black;
  }
`;

// 이미지 영역

export const UploadFileWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
