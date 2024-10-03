import styled from "@emotion/styled";

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

export const RequiredName = styled.p`
  font-size: 18px;
  ::after {
    content: "*";
    color: red;
    margin-left: 3px;
  }
`;
export const OptionalName = styled.p`
  font-size: 18px;
`;

export const Market = styled.label`
  font-size: 25px;
  font-weight: 600;
  color: #0064ff;
  margin-bottom: 30px;
`;

// Title
export const TitleWrap = styled.div`
  /* border: 1px solid red; */
  position: relative;
  width: 100%;
  margin-bottom: 40px;
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
  margin-top: 5px;
  :focus {
    caret-color: transparent;
    border: 2px solid #0064ff;
  }
`;

export const TitleError = styled.p`
  position: absolute;
  color: red;
  font-size: 14px;
  bottom: -25px;
  left: 5px;
`;

// Remarks
export const RemarksWrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 40px;
`;

export const RemarksInput = styled.input`
  border: 2px solid #bec0c4;
  border-radius: 10px;
  outline: none;
  height: 35px;
  width: 100%;
  font-size: 18px;
  padding-top: 2px;
  padding-left: 15px;
  margin-top: 5px;
  :focus {
    caret-color: transparent;
    border: 2px solid #0064ff;
  }
`;
export const RemarksError = styled.p`
  position: absolute;
  color: red;
  font-size: 14px;
  bottom: -25px;
  left: 5px;
`;

// Contents
export const ContentsWrap = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  margin-bottom: 10px;
`;

export const ContentsError = styled.p`
  position: absolute;
  color: red;
  font-size: 14px;
  bottom: 5px;
  left: 5px;
`;

// Price
export const PriceWrap = styled.div`
  /* border: 1px solid red; */
  position: relative;
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
`;

export const PriceInput = styled.input`
  border: 2px solid #bec0c4;
  border-radius: 10px;
  outline: none;
  height: 35px;
  width: 20%;
  font-size: 18px;
  padding-top: 2px;
  padding-left: 15px;
  margin-top: 5px;
  :focus {
    caret-color: transparent;
    border: 2px solid #0064ff;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const PriceError = styled.p`
  position: absolute;
  color: red;
  font-size: 14px;
  bottom: -25px;
  left: 5px;
`;

// Tags
export const TagsWrap = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  height: 100px;
`;

// Map
export const MapWrap = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const MapP1 = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
`;
export const MapP2 = styled.p`
  font-size: 12px;
  margin-bottom: 5px;
`;

export const Map = styled.div`
  border: 1px solid #0064ff;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const MapButton = styled.div`
  /* border: 1px solid blue; */
  border-radius: 7px;
  background-color: #3385ff;
  position: absolute;
  z-index: 1;
  width: 98%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  bottom: 5px;
  cursor: pointer;

  :hover {
    background-color: #0056e0;
  }
`;

// Map 모달
export const ModalMapWrap = styled.div`
  margin: 10px 0;
`;

export const ModalTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

export const ModalInfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const ModalInput = styled.input`
  border: 2px solid #bec0c4;
  border-radius: 5px;
  outline: none;
  height: 30px;
  line-height: 30px;
  width: 70%;
  font-size: 14px;
  padding-top: 2px;
  padding-left: 10px;
  margin-right: 5px;
  :focus {
    caret-color: transparent;
    border: 2px solid #0064ff;
  }
`;

export const ModalBtn = styled.div`
  /* border: 2px solid #bdbdbd; */
  background-color: #0064ff;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  width: 30%;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  cursor: pointer;

  :hover {
    background-color: #0056e0;
  }
`;

export const ImageWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

// 등록하기 or 취소
export const MarketWriterBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
`;

export const Submit = styled.button`
  border: none;
  border-radius: 10px;
  width: 100%;
  background-color: #0064ff;
  height: 50px;
  margin-left: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;

  :hover {
    background-color: #0056e0;
  }
`;

export const Cancel = styled.button`
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  width: 100%;
  background-color: #fff;
  height: 50px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  :hover {
    background-color: #e0e0e0;
  }
`;
