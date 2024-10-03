import styled from "@emotion/styled";

// 포인트 상태에 따라 색상 및 +- 스타일
interface MyStatusAmount {
  isStatusAmount: boolean;
}
// 포인트 내용에 따라 3가지 색상 스타일
interface MyStatus {
  isStatus: string;
}

export const Wrap = styled.div`
  height: 440px;
`;

export const TableHeadWrap = styled.div`
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  height: 40px;
  justify-content: space-between;
`;

// 날짜
export const TableCreatedAt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 10%;
`;

// 내용
export const TableStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 15%;
`;

// 거래 및 충전 내역
export const TableAmount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 20%;
`;

// 잔액
export const TableBalance = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 15%;
`;

//
//
//
// 테이블 내용 공간
export const TableContentsWrap = styled.div`
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  height: 40px;
  justify-content: space-between;
`;

// 날짜
export const TableContentCreatedAt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #4f4f4f;
  width: 10%;
`;

// 내용
export const Status = styled.p<MyStatus>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  color: ${(props) =>
    props.isStatus === "구매"
      ? "#0031E0"
      : props.isStatus === "충전"
      ? "#FF4500"
      : "#FFD600"};
  width: 15%;
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
    content: "${(props) => (props.isStatusAmount ? "" : "+")}";
  }
`;

// 잔액
export const TableContentBalance = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: #4f4f4f;
  width: 15%;
`;

// 내용없음
export const NotContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 22px;
  font-weight: 700;
  color: gray;
`;

// 전체 내역에 대한 안내문
export const TextInfo1 = styled.p`
  font-size: 12px;
  font-weight: 700;
  margin-top: 5px;
`;

export const TextInfo2 = styled.p`
  font-size: 12px;
  font-weight: 700;
`;
