import styled from "@emotion/styled";

// 포인트 상태에 따라 색상 및 +- 스타일
interface MyStatusAmount {
  isStatusAmount: boolean;
}

export const Wrap = styled.div`
  height: 440px;
  width: 100%;
`;

export const TableHeadWrap = styled.div`
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  height: 40px;
  justify-content: space-between;
`;

// 충전일
export const TableCreatedAt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 10%;
`;

// 결제 ID
export const TableImpID = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 20%;
`;

// 충전내역
export const TableAmount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  width: 20%;
`;

// 충전 후 잔액
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

// 충전일
export const TableContentCreatedAt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #4f4f4f;
  width: 10%;
`;

// 결제 ID
export const TableContentImpID = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  width: 20%;
`;

// 충전내역
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

// 충전 후 잔액
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
