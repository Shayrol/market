import styled from "@emotion/styled";

// 상단 버튼에 대한 스타일
interface MyPageProps {
  selected: boolean;
}
// 포인트 상태에 따라 색상 및 +- 스타일
interface MyStatusAmount {
  isStatusAmount: boolean;
}
// 포인트 내용에 따라 3가지 색상 스타일
interface MyStatus {
  isStatus: string;
}

export const Wrap = styled.div`
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

export const TableHeadWrap = styled.div`
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  height: 40px;
  justify-content: space-between;
`;

// 잔액
export const TableBalance = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  width: 10%;
`;

// 내용 상태 - 충전, 판매, 구매
export const TableStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  width: 20%;
`;

// 거래 및 충전 내역
export const TableAmount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  width: 20%;
`;

// 날짜
export const TableCreatedAt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  width: 10%;
`;

// 테이블 내용
export const TableContentsWrap = styled.div`
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  height: 40px;
  justify-content: space-between;
  padding: 0 5px;
  :last-child {
    /* border-bottom: none; */
  }
`;

// 날짜
export const TableContentCreatedAt = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #4f4f4f;
  width: 10%;
`;

// 상품명 공간
export const TableContentStatusWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
`;

// 내용
export const Status = styled.p<MyStatus>`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) =>
    props.isStatus === "구매"
      ? "#0031E0"
      : props.isStatus === "충전"
      ? "#FF4500"
      : "#FFD600"};
`;

// 거래 및 충전 내역
export const TableContentAmount = styled.div<MyStatusAmount>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => (props.isStatusAmount ? "#0031E0" : "#FFD600")};
  width: 20%;

  ::before {
    content: "${(props) => (props.isStatusAmount ? "-" : "+")}";
  }
`;

export const TableContentBalance = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: #4f4f4f;
  width: 15%;
`;
