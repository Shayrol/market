import styled from "@emotion/styled";

interface MyPageProps {
  selected: boolean;
}

export const Wrap = styled.div`
  /* search로 인한 position 사용 */
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 0 0 15px;
  margin-top: 20px;
  flex-direction: column;
`;

export const MyPageHeadWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const MyPageHeadBtn = styled.div`
  display: flex;
  gap: 10px;
`;

// 나의상품, 마이찜 버튼
export const MyPageInfoBtn = styled.div<MyPageProps>`
  /* border: 1px solid red; */
  color: ${(props) => (props.selected ? "#000000" : "#4F4F4F")};
  font-size: 16px;
  font-weight: ${(props) => (props.selected ? "700" : "500")};
  border-bottom: ${(props) => (props.selected ? "2px solid #0064ff" : "none")};
  cursor: pointer;

  :hover {
    border-bottom: 2px solid #0064ff;
    font-weight: 700;
  }
`;

// 나의상품, 마이찜 보여줄 내용
export const MyPageBodyWrap = styled.div`
  border-top: 2px solid #000000;
  border-bottom: 2px solid #000000;
  display: flex;
  flex-direction: column;
`;

export const TableWrap = styled.div`
  width: 100%;
  height: 440px;
`;
