import styled from "@emotion/styled";
// import type { ITextTokenProps } from "./BoardList.types";

interface ITextTokenProps {
  isMatched: boolean;
}

export const Wrapper = styled.div`
  width: 1200px;
  margin: 30px;
`;

export const TableTop = styled.div`
  border-top: 2px solid gray;
  margin-top: 20px;
`;

export const TableBottom = styled.div`
  border-bottom: 2px solid gray;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
  user-select: none;
`;
export const RowList = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
  cursor: pointer;
  :hover {
    background-color: #e2e2e2;
    /* border-bottom: 1px solid #0064ff; */
    transition: 0.3s;
  }
`;

export const ColumnHeaderBasic = styled.div`
  width: 10%;
  text-align: center;
  font-weight: 600;
`;

export const ColumnHeaderTitle = styled.div`
  width: 70%;
  text-align: center;
  font-weight: 600;
`;

export const ColumnBasic = styled.div`
  width: 10%;
  text-align: center;
  overflow: hidden; /* 내용이 박스를 넘치면 숨기기 */
  white-space: nowrap; /* 텍스트를 한 줄로 표시 */
  text-overflow: ellipsis; /* 넘친 텍스트에 '...' 표시 */
`;

export const ColumnTitle = styled.div`
  padding: 0 200px;
  width: 70%;
  text-align: center;
  cursor: pointer;
  overflow: hidden; /* 내용이 박스를 넘치면 숨기기 */
  white-space: nowrap; /* 텍스트를 한 줄로 표시 */
  text-overflow: ellipsis; /* 넘친 텍스트에 '...' 표시 */

  :hover {
    color: blue;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
`;

export const PencilIcon = styled.img``;

export const Button = styled.button`
  width: 171px;
  height: 52px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  :hover {
    background-color: #f5f2fc;
    border: 2px solid #0064ff;
    /* color: #0064ff; */
  }
`;

export const TextToken = styled.span`
  color: ${(props: ITextTokenProps) => (props.isMatched ? "red" : "black")};
`;

export const BestWrap = styled.div`
  width: 100%;
  height: 270px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
`;

export const H3 = styled.h3`
  margin-bottom: 5px;
`;

export const BestBoard = styled.div`
  /* border: 1px solid blue; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  width: 100%;
  overflow: hidden;
  transition: 0.3s;
  cursor: pointer;

  :hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
    transition: 0.3s;
  }
`;

export const BestBoardImgWrap = styled.div`
  width: 100%;
  height: 60%;
  pointer-events: none;
`;

export const BestImg = styled.img`
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const BestBoardUserWrap = styled.div`
  padding: 10px 20px;
  width: 100%;
  pointer-events: none;
`;

export const BestBoardTitle = styled.div`
  /* border: 1px solid red; */
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  overflow: hidden; /* 내용이 박스를 넘치면 숨기기 */
  white-space: nowrap; /* 텍스트를 한 줄로 표시 */
  text-overflow: ellipsis; /* 넘친 텍스트에 '...' 표시 */
  pointer-events: none;
`;

export const BestBoardUser = styled.div`
  display: flex;
  pointer-events: none;
`;

export const WriterWrap = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  pointer-events: none;
`;

export const Writer = styled.div`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 5px;
  pointer-events: none;
`;

export const Date = styled.div`
  font-size: 12px;
  pointer-events: none;
`;

export const BoardLikeWrap = styled.div`
  /* border: 1px solid red; */
  position: flex;
  flex-direction: column;
  pointer-events: none;
`;

export const Vector = styled.img`
  width: 20px;
  height: 20px;
  margin-bottom: 5px;
  pointer-events: none;
`;

export const LikeCount = styled.div`
  font-size: 10px;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;
